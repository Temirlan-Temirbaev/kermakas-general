import type { Schema, Attribute } from '@strapi/strapi';

export interface InfoBlockInfoBlock extends Schema.Component {
  collectionName: 'components_info_block_info_blocks';
  info: {
    displayName: 'info-block';
    icon: 'apps';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    info: Attribute.Text;
  };
}

export interface ProductFieldProductField extends Schema.Component {
  collectionName: 'components_product_field_product_fields';
  info: {
    displayName: 'product_field';
    icon: 'bold';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    value: Attribute.String;
    description: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'info-block.info-block': InfoBlockInfoBlock;
      'product-field.product-field': ProductFieldProductField;
    }
  }
}
