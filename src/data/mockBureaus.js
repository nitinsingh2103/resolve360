/**
 * Demo Bureaus / Cells for AICTE Resolve360 Prototype
 * Note: These are illustrative demo departments for SIH prototype modeling,
 * not verified official AICTE organizational divisions.
 */

export const MOCK_BUREAUS = [
  {
    id: 'bur-approval',
    name: 'Approval and Accreditation',
    code: 'B-AAC',
    head: 'Dr. Rameshwar Sharma',
    email: 'head.approval@demo.aicte.gov.in',
    phone: '+91 11 2958 1001',
    description: 'Handles institutional extension of approval, intake variations, and affiliation verification.',
    slaDaysDefault: 14,
    color: '#2563eb', // Blue
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    id: 'bur-academic',
    name: 'Academic Affairs',
    code: 'B-ACA',
    head: 'Prof. Ananya Sen',
    email: 'head.academic@demo.aicte.gov.in',
    phone: '+91 11 2958 1002',
    description: 'Deals with curriculum compliance, faculty qualification norms, examinations, and university affiliations.',
    slaDaysDefault: 10,
    color: '#0891b2', // Cyan
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700'
  },
  {
    id: 'bur-finance',
    name: 'Finance and Administration',
    code: 'B-FAD',
    head: 'Shri Amitabh Verma',
    email: 'head.finance@demo.aicte.gov.in',
    phone: '+91 11 2958 1003',
    description: 'Monitors fee structure regulations, capitation fee complaints, staff pay scale compliance, and scholarships.',
    slaDaysDefault: 12,
    color: '#7c3aed', // Purple
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700'
  },
  {
    id: 'bur-grievance',
    name: 'Grievance Redressal',
    code: 'B-GRC',
    head: 'Dr. Rajeshwari Nair',
    email: 'head.grievance@demo.aicte.gov.in',
    phone: '+91 11 2958 1004',
    description: 'Addresses student disputes, anti-ragging escalation, institutional ombudsman appeals, and harassment issues.',
    slaDaysDefault: 7,
    color: '#ea580c', // Orange
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700'
  },
  {
    id: 'bur-tech',
    name: 'Technical Support',
    code: 'B-TEC',
    head: 'Er. Sandeep Joshi',
    email: 'head.tech@demo.aicte.gov.in',
    phone: '+91 11 2958 1005',
    description: 'Provides technical portal assistance, E-Governance portal bug fixes, digital affidavit processing, and API sync.',
    slaDaysDefault: 5,
    color: '#059669', // Emerald
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700'
  }
];

export const COMPLAINT_CATEGORIES = [
  'Faculty & Staff Grievance',
  'Fee Irregularities & Capitation Fee',
  'Infrastructure & Lab Deficiencies',
  'Admission & Refund Irregularity',
  'Curriculum & Examination Violation',
  'Harassment & Ragging Redressal',
  'Portal & Technical Glitch'
];

export const COMPLAINT_PRIORITIES = ['Critical', 'High', 'Medium', 'Low'];

export const COMPLAINT_STATUSES = [
  'Submitted',
  'Under Review',
  'In Progress',
  'Awaiting Information',
  'Resolved',
  'Closed'
];

export const DEMO_OFFICERS_BY_BUREAU = {
  'Approval and Accreditation': ['Dr. Rameshwar Sharma', 'Pooja Agarwal', 'Kiran Patel'],
  'Academic Affairs': ['Prof. Ananya Sen', 'Dr. Sudhir Deshmukh', 'Meera Krishnan'],
  'Finance and Administration': ['Shri Amitabh Verma', 'Vikas Singhania', 'Rekha Das'],
  'Grievance Redressal': ['Dr. Rajeshwari Nair', 'Kavita Rathore', 'Anand Swamy'],
  'Technical Support': ['Er. Sandeep Joshi', 'Mohit Bansal', 'Deepa Rao']
};
