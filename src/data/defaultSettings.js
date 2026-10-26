/**
 * Default configurable settings for AICTE Resolve360 Prototype
 */

export const DEFAULT_SETTINGS = {
  userProfile: {
    name: 'Dr. Alok K. Mishra',
    role: 'Member Secretary & Chief Monitoring Officer',
    email: 'cmo.resolve360@demo.aicte.gov.in',
    phone: '+91 11 2958 1000',
    department: 'Central Grievance & Vigilance Bureau',
    avatar: 'AM',
    adminLevel: 'National Bureau Administrator (Tier 1)'
  },
  slaDays: {
    'Critical': 5,
    'High': 10,
    'Medium': 14,
    'Low': 21
  },
  bureauSlaDays: {
    'Approval and Accreditation': 14,
    'Academic Affairs': 10,
    'Finance and Administration': 12,
    'Grievance Redressal': 7,
    'Technical Support': 5
  },
  notificationsEnabled: true,
  autoEscalateOverdue: true,
  escalationThresholdHours: 48,
  prototypeDisclaimer: 'This application is a Smart India Hackathon prototype (SIH26264). Data displayed is simulated demonstration data and not officially connected to live AICTE databases.'
};
