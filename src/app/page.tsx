import HomeClient from "@/components/HomeClient";
import { getPageState } from "@/lib/menuHelpers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    state?: string;
  }>;
}) {
  const params = await searchParams;

  const state = getPageState(params.state);

  return <HomeClient state={state} />;
}
