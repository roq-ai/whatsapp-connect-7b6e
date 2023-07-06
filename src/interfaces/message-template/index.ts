import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface MessageTemplateInterface {
  id?: string;
  template_name: string;
  template_content: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface MessageTemplateGetQueryInterface extends GetQueryInterface {
  id?: string;
  template_name?: string;
  template_content?: string;
  organization_id?: string;
}
