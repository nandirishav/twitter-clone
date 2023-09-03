import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Notifications = async (context: NextPageContext) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
