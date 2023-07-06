const mapping: Record<string, string> = {
  customers: 'customer',
  'message-templates': 'message_template',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
