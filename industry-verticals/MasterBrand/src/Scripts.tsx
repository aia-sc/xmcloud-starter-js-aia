'use client';
import { JSX, useEffect } from 'react';
import { ClientEditingChromesUpdate, useSitecore } from '@sitecore-content-sdk/nextjs';
import {
  getContentSdkPagesClientData,
  getDesignLibraryScriptLink,
} from '@sitecore-content-sdk/content/editing';
import CdpPageView from 'components/content-sdk/CdpPageView';
import BYOCInit from './byoc';

const appendJsonScript = (id: string, data: unknown) => {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/json';
  script.text = JSON.stringify(data);
  document.body.appendChild(script);
};

const appendSrcScript = (src: string) => {
  const alreadyLoaded = Array.from(document.scripts).some((script) => script.src === src);
  if (alreadyLoaded) return;

  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.appendChild(script);
};

/**
 * Pages chromes the document as soon as the editing scripts are in the HTML.
 * Insert them after hydration, with DOM script nodes so the browser executes them.
 */
const EditingBootstrap = (): null => {
  const {
    page: { mode, layout },
    api,
  } = useSitecore();

  useEffect(() => {
    if (mode.isNormal || mode.isPreview) return;

    if (mode.isDesignLibrary) {
      const now = new Date();
      const cacheTimestamp = [
        now.getUTCHours(),
        now.getUTCDate(),
        now.getUTCMonth() + 1,
        now.getUTCFullYear(),
      ]
        .map((part) => String(part).padStart(2, '0'))
        .join('-');
      appendSrcScript(
        `${getDesignLibraryScriptLink(api?.edge?.edgeUrl)}?cb=${cacheTimestamp}`
      );
      return;
    }

    const clientData = {
      ...(layout.sitecore.context.clientData ?? {}),
      ...getContentSdkPagesClientData(),
    };

    Object.entries(clientData).forEach(([id, value]) => appendJsonScript(id, value));
    layout.sitecore.context.clientScripts?.forEach(appendSrcScript);
  }, [api, layout, mode]);

  return null;
};

const Scripts = (): JSX.Element => {
  return (
    <>
      <BYOCInit />
      <CdpPageView />
      <ClientEditingChromesUpdate />
      <EditingBootstrap />
    </>
  );
};

export default Scripts;
