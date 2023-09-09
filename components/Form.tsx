"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import Avatar from "./Avatar";
import Button from "./Button";
import { HiPhotograph } from "react-icons/hi";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
      const formData = new FormData();
      let imgUrl = "";
      if (!isComment && (image || imageURL)) {
        formData.append("file", image);
        formData.append("upload_preset", "vvq11v0t");
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        imgUrl = data?.secure_url;
      }

      await axios.post(url, {
        body,
        ...(!isComment && imgUrl && { image: imgUrl }),
      });

      toast.success("Tweet created");
      setBody("");
      setImage("");
      setImageURL("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [isComment, postId, body, mutatePosts, mutatePost, image]);

  const handleImageSelect = (event: any) => {
    if (!event.target.files) return;

    setImageURL(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageURL || "/images/placeholder.png"}
                style={{
                  objectFit: "cover",
                  height: "300px",
                }}
                alt=""
              />
            )}
            <div className="mt-4 flex flex-row justify-end items-center gap-4">
              <input
                type="file"
                id="file-input"
                className="hidden"
                name="file-input"
                onChange={handleImageSelect}
                accept=".jpg, .jpeg, .png"
              />
              <label
                id="file-input-label"
                htmlFor="file-input"
                className="cursor-pointer"
              >
                <HiPhotograph size={30} color="white" />
              </label>
              <Button
                disabled={isLoading || (!body && !image)}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
