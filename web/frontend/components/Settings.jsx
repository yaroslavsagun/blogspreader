import {
  Card,
  Heading,
  TextContainer,
  Stack,
  Select,
  OptionList,
  Button,
  ChoiceList
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useCallback, useEffect } from "react";

export function Settings() {
  const fetch = useAuthenticatedFetch();
  const [isSaving, setIsSaving] = useState(false);
  async function saveSettings(){
    setIsSaving(true);
    await fetch("/api/settings/save")
    setIsSaving(false);
  }
  return (
    <>
      <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Blogpost spreader</Heading>
                    <Button primary onClick={saveSettings} loading={isSaving}>Start parsing (it will start automatically,but you can start right now by pressing the button)</Button>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
    </>
  );
}
