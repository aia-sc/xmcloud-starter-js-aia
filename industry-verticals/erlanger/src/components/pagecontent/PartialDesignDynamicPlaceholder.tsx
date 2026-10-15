'use client';

import { JSX } from 'react';
import { AppPlaceholder, type ComponentMap } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type PartialDesignDynamicPlaceholderProps = ComponentProps & {
  componentMap: ComponentMap;
};

const PartialDesignDynamicPlaceholder = ({
  rendering,
  page,
  componentMap,
}: PartialDesignDynamicPlaceholderProps): JSX.Element => (
  <AppPlaceholder
    name={rendering?.params?.sig || ''}
    rendering={rendering}
    page={page}
    componentMap={componentMap}
  />
);

export default PartialDesignDynamicPlaceholder;
