export default [
  {
    path: 'index',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: 'real-name',
    name: 'real-name',
    component: () => import('../views/Members/Real-name.vue'),
  },
  {
    path: 'management',
    name: 'management',
    component: () => import('../views/Members/Management.vue'),
  },
  {
    path: 'balance',
    name: 'balance',
    component: () => import('../views/Members/Balance.vue'),
  },
  {
    path: 'Record',
    name: 'Record',
    component: () => import('@/views/Invitation/Record.vue'),
  },
  {
    path: 'Ranking',
    name: 'Ranking',
    component: () => import('@/views/Invitation/Ranking.vue'),
  },
  {
    path: 'Order',
    name: 'Order',
    component: () => import('@/views/CTC/Order.vue'),
  },
  {
    path: 'Rxchang',
    name: 'Rxchang',
    component: () => import('@/views/CTC/Rxchang.vue'),
  },
  {
    path: 'Charge',
    name: 'Charge',
    component: () => import('@/views/Financial/Charge.vue'),
  },
  {
    path: 'Detail',
    name: 'Detail',
    component: () => import('@/views/Financial/Detail.vue'),
  },
  {
    path: 'Fiat',
    name: 'Fiat',
    component: () => import('@/views/Financial/Fiat.vue'),
  },
  {
    path: 'Financial',
    name: 'Financial',
    component: () => import('@/views/Financial/Financial.vue'),
  },
  {
    path: 'Mention',
    name: 'Mention',
    component: () => import('@/views/Financial/Mention.vue'),
  },
  {
    path: 'Service',
    name: 'Service',
    component: () => import('@/views/Financial/Service.vue'),
  },
  {
    path: 'Trading',
    name: 'Trading',
    component: () => import('@/views/Financial/Trading.vue'),
  },
  {
    path: 'Orderss',
    name: 'Orderss',
    component: () => import('@/views/Coin/Order.vue'),
  },
  {
    path: 'Setup',
    name: 'Setup',
    component: () => import('@/views/Coin/Setup.vue'),
  },
  {
    path: 'Advertising',
    name: 'Advertising',
    component: () => import('@/views/Content/Advertising.vue'),
  },
  {
    path: 'Announcement',
    name: 'Announcement',
    component: () => import('@/views/Content/Announcement.vue'),
  },
  {
    path: 'Help',
    name: 'Help',
    component: () => import('@/views/Content/Help.vue'),
  },
  {
    path: 'Activity',
    name: 'Activity',
    component: () => import('@/views/Activity/Activity.vue'),
  },
  {
    path: 'Envelope',
    name: 'Envelope',
    component: () => import('@/views/Envelope/Envelope.vue'),
  },
  {
    path: 'Maintenance',
    name: 'Maintenance',
    component: () => import('@/views/System/Maintenance.vue'),
  },
  {
    path: 'Version',
    name: 'Version',
    component: () => import('@/views/System/Version.vue'),
  },
  {
    path: 'Bulk',
    name: 'Bulk',
    component: () => import('@/views/System/Bulk.vue'),
  },
  {
    path: 'Deploy',
    name: 'Deploy',
    component: () => import('@/views/System/Deploy.vue'),
  },
  {
    path: 'Pact',
    name: 'Pact',
    component: () => import('@/views/System/Pact.vue'),
  },
  {
    path: 'Ensure',
    name: 'Ensure',
    component: () => import('@/views/Ensure/Ensure.vue'),
  },
  {
    path: 'Advertisings',
    name: 'Advertisings',
    component: () => import('@/views/OTC/Advertising.vue'),
  },
  {
    path: 'Certification',
    name: 'Certification',
    component: () => import('@/views/OTC/Certification.vue'),
  },
  {
    path: 'Complaint',
    name: 'Complaint',
    component: () => import('@/views/OTC/Complaint.vue'),
  },
  {
    path: 'Currency',
    name: 'Currency',
    component: () => import('@/views/OTC/Currency.vue'),
  },
  {
    path: 'Orders',
    name: 'Orders',
    component: () => import('@/views/OTC/Order.vue'),
  },
  {
    path: 'Surrender',
    name: 'Surrender',
    component: () => import('@/views/OTC/Surrender.vue'),
  },
];
