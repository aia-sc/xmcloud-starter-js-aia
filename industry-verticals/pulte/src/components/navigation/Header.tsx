'use client';

import {
  AppPlaceholder,
  ComponentMap,
  ImageField,
  NextImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { isPulteSite, resolvePulteImage } from 'lib/pulte-media';
import { JSX } from 'react';

export type HeaderProps = ComponentProps & {
  fields: {
    LogoImage: ImageField;
  };
  componentMap: ComponentMap;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();

  return (
    <div className={`component header ${props.params.styles?.trimEnd()}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <AppPlaceholder
              name="header-left"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
          </div>
          <div className="col">
            <AppPlaceholder
              name="header-right"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithLogoImage = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const { page } = useSitecore();
  const logo = resolvePulteImage(
    page.siteName,
    props.fields?.LogoImage,
    'logoWhite',
    'Pulte Homes',
    200,
    120
  );

  return (
    <div className={`component header ${sxaStyles}`} id={id ? id : undefined}>
      <div className={`container container-${props.params?.ContainerWidth?.toLowerCase()}-fluid`}>
        <div className="row align-items-center">
          <div className="col-auto">
            <a href="/">
              <NextImage
                field={logo}
                width={isPulteSite(page.siteName) ? 140 : 200}
                height={isPulteSite(page.siteName) ? 84 : 50}
                className={isPulteSite(page.siteName) ? 'pulte-logo' : undefined}
              />
            </a>
          </div>
          <div className="col">
            <AppPlaceholder
              name="header-right"
              rendering={props.rendering}
              page={page}
              componentMap={props.componentMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
