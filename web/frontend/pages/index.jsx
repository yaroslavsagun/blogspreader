import {
  Page,
  Layout
} from "@shopify/polaris";

import { Settings } from "../components";

export default function HomePage() {

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Settings></Settings>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
