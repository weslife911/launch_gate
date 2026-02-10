import HubsSelectionClient from "@/components/referral/HubsSelectionClient";


type Params = Promise<{ username: string }>;

export default async function HubsSelectionPage({ params }: { params: Params }) {
  const { username } = await params;

  return <HubsSelectionClient username={username} />;
}