/**
 * Realistic Mock Complaint Records for AICTE Resolve360 Prototype
 * Reference date anchor: 2026-10-26T22:20:00+05:30
 * Contains ~38 diverse, realistic case records across AICTE bureaus.
 */

export const INITIAL_COMPLAINTS = [
  {
    id: 'AICTE-2026-001',
    institutionName: 'Apex Institute of Technology & Engineering',
    institutionCode: '1-3647192801',
    category: 'Faculty & Staff Grievance',
    description: 'Non-payment of 7th CPC revised pay scales to 32 assistant professors for 8 months and withholding experience certificates upon resignation.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Shri Amitabh Verma',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-02T10:15:00+05:30',
    dueDate: '2026-10-16T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-22T14:30:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Resolution deadline exceeded by 10 days; lack of institutional management response.',
      reviewedBy: 'Super Admin (Joint Secretary)',
      reviewedAt: '2026-10-23T11:00:00+05:30',
      actionTaken: 'Formal Show Cause Notice issued to Chairman and Registrar.'
    },
    comments: [
      {
        id: 'c1-1',
        author: 'Shri Amitabh Verma',
        role: 'Bureau Officer',
        timestamp: '2026-10-04T11:20:00+05:30',
        text: 'Initial directive sent to college trust accounts department requesting salary disbursement proofs.',
        internalOnly: false
      },
      {
        id: 'c1-2',
        author: 'Dr. Suresh Rao',
        role: 'Zonal Inspector',
        timestamp: '2026-10-18T16:45:00+05:30',
        text: 'Institute failed to submit bank statements by SLA deadline. Recommending physical audit and freeze of expansion approvals.',
        internalOnly: true
      }
    ],
    history: [
      { id: 'h1-1', timestamp: '2026-10-02T10:15:00+05:30', action: 'Complaint Submitted', actor: 'Faculty Association', details: 'Case lodged through National Grievance Portal.' },
      { id: 'h1-2', timestamp: '2026-10-03T09:30:00+05:30', action: 'Assigned to Bureau', actor: 'Automated Routing', details: 'Assigned to Finance and Administration bureau.' },
      { id: 'h1-3', timestamp: '2026-10-04T10:00:00+05:30', action: 'Status Changed', actor: 'Shri Amitabh Verma', details: 'Status moved to In Progress.' },
      { id: 'h1-4', timestamp: '2026-10-17T09:00:00+05:30', action: 'SLA Breached', actor: 'System Monitor', details: 'Marked overdue due to target date lapse.' }
    ]
  },
  {
    id: 'AICTE-2026-002',
    institutionName: 'Maharaja Agrasen College of Engineering, Jaipur',
    institutionCode: '1-4820194811',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Computer Science and AI labs lack requisite GPU workstations and licensed simulation software as mandated in AICTE Approval Process Handbook (APH 2026).',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Dr. Rameshwar Sharma',
    priority: 'High',
    status: 'Under Review',
    createdAt: '2026-10-08T14:20:00+05:30',
    dueDate: '2026-10-22T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-20T11:15:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Physical inspection compliance report delayed beyond 14-day SLA limit.',
      reviewedBy: 'Admin (Regional Director)',
      reviewedAt: '2026-10-24T10:00:00+05:30',
      actionTaken: 'Nominated 2-member expert committee for surprise inspection.'
    },
    comments: [
      {
        id: 'c2-1',
        author: 'Dr. Rameshwar Sharma',
        role: 'Bureau Head',
        timestamp: '2026-10-10T12:00:00+05:30',
        text: 'Geo-tagged infrastructure video walkthrough requested from Principal.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h2-1', timestamp: '2026-10-08T14:20:00+05:30', action: 'Complaint Submitted', actor: 'Student Council Rep', details: 'Filed under Lab & Academic Facilities deficiency.' },
      { id: 'h2-2', timestamp: '2026-10-09T10:00:00+05:30', action: 'Status Changed', actor: 'Dr. Rameshwar Sharma', details: 'Moved from Submitted to Under Review.' }
    ]
  },
  {
    id: 'AICTE-2026-003',
    institutionName: 'Vellore Zenith School of Management & Research',
    institutionCode: '1-9928172634',
    category: 'Fee Irregularities & Capitation Fee',
    description: 'Demand for illegal caution deposit surcharge of INR 75,000 in cash during admission counseling against AICTE fee regulatory committee guidelines.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Vikas Singhania',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-14T09:45:00+05:30',
    dueDate: '2026-10-27T17:00:00+05:30', // Due within 48h!
    updatedAt: '2026-10-25T16:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c3-1',
        author: 'Vikas Singhania',
        role: 'Bureau Officer',
        timestamp: '2026-10-16T11:00:00+05:30',
        text: 'Receipt copies received from 4 affected parents. Verification with state admission committee ongoing.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h3-1', timestamp: '2026-10-14T09:45:00+05:30', action: 'Complaint Submitted', actor: 'Parent Welfare Forum', details: 'Receipt evidence uploaded.' },
      { id: 'h3-2', timestamp: '2026-10-15T11:30:00+05:30', action: 'Assigned to Bureau', actor: 'System', details: 'Tagged as Capitation Fee Violation.' },
      { id: 'h3-3', timestamp: '2026-10-16T10:00:00+05:30', action: 'Status Changed', actor: 'Vikas Singhania', details: 'Moved to In Progress.' }
    ]
  },
  {
    id: 'AICTE-2026-004',
    institutionName: 'Global Institute of Pharmaceutical Sciences, Lucknow',
    institutionCode: '1-2849102941',
    category: 'Harassment & Ragging Redressal',
    description: 'Failure to enforce anti-ragging measures in hostel annex; institutional anti-ragging cell failed to hold enquiry within statutory 24 hours.',
    bureau: 'Grievance Redressal',
    assignedOfficer: 'Dr. Rajeshwari Nair',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-21T18:00:00+05:30',
    dueDate: '2026-10-28T17:00:00+05:30', // Due within 48h
    updatedAt: '2026-10-26T10:30:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c4-1',
        author: 'Dr. Rajeshwari Nair',
        role: 'Bureau Head',
        timestamp: '2026-10-22T09:15:00+05:30',
        text: 'Coordinating with local district magistrate and university ombudsman. Case file priority elevated.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h4-1', timestamp: '2026-10-21T18:00:00+05:30', action: 'Complaint Submitted', actor: 'Student Helpline Forward', details: 'Urgent flag tagged.' },
      { id: 'h4-2', timestamp: '2026-10-22T08:30:00+05:30', action: 'Status Changed', actor: 'Dr. Rajeshwari Nair', details: 'Escalated immediately to In Progress.' }
    ]
  },
  {
    id: 'AICTE-2026-005',
    institutionName: 'Bengal Institute of Maritime & Marine Engineering, Kolkata',
    institutionCode: '1-5120394851',
    category: 'Curriculum & Examination Violation',
    description: 'Conducting unsanctioned evening diploma batches in marine mechanics without AICTE or Director General of Shipping concurrence.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Prof. Ananya Sen',
    priority: 'High',
    status: 'Awaiting Information',
    createdAt: '2026-10-11T11:20:00+05:30',
    dueDate: '2026-10-21T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-23T15:40:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Institution missed second extension notice to present council affiliation charter.',
      reviewedBy: 'Academic Cell Oversight Committee',
      reviewedAt: '2026-10-25T14:00:00+05:30',
      actionTaken: 'Summoned Director and Dean of Academics for hearing on Nov 2.'
    },
    comments: [
      {
        id: 'c5-1',
        author: 'Prof. Ananya Sen',
        role: 'Bureau Head',
        timestamp: '2026-10-12T14:00:00+05:30',
        text: 'Affiliation council records requested to verify if approval was granted under autonomous university status.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h5-1', timestamp: '2026-10-11T11:20:00+05:30', action: 'Complaint Submitted', actor: 'Anonymous Whistleblower', details: 'Detailed flyer and prospectus submitted.' },
      { id: 'h5-2', timestamp: '2026-10-13T10:00:00+05:30', action: 'Status Changed', actor: 'Prof. Ananya Sen', details: 'Status moved to Awaiting Information.' }
    ]
  },
  {
    id: 'AICTE-2026-006',
    institutionName: 'Pune City College of Polytechnic & Architecture',
    institutionCode: '1-7482910382',
    category: 'Admission & Refund Irregularity',
    description: 'Refusal to refund full tuition fee upon seat cancellation within national cutoff date (retention of 50% cancellation deduction).',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Rekha Das',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-09-28T10:00:00+05:30',
    dueDate: '2026-10-10T17:00:00+05:30',
    updatedAt: '2026-10-09T16:20:00+05:30',
    resolutionNotes: 'Institution issued full refund of INR 68,000 with a deduction of permissible processing fee of INR 1,000 as per AICTE Fee Refund Policy 2026. UTR number confirmed by candidate.',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c6-1',
        author: 'Rekha Das',
        role: 'Desk Officer',
        timestamp: '2026-10-05T12:00:00+05:30',
        text: 'Notice sent citing Supreme Court and AICTE mandate on seat cancellation refunds.',
        internalOnly: false
      },
      {
        id: 'c6-2',
        author: 'Rekha Das',
        role: 'Desk Officer',
        timestamp: '2026-10-09T16:15:00+05:30',
        text: 'Bank remittance receipt received from accounts office. Case resolved.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h6-1', timestamp: '2026-09-28T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Candidate Parent', details: 'Admission seat cancellation refund claim.' },
      { id: 'h6-2', timestamp: '2026-10-02T11:00:00+05:30', action: 'Status Changed', actor: 'Rekha Das', details: 'Moved to In Progress.' },
      { id: 'h6-3', timestamp: '2026-10-09T16:20:00+05:30', action: 'Status Changed', actor: 'Rekha Das', details: 'Marked Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-007',
    institutionName: 'Hyderabad Institute of Applied Technology',
    institutionCode: '1-6382910472',
    category: 'Portal & Technical Glitch',
    description: 'AICTE portal credential sync failure during online faculty biometric attendance upload; API returning HTTP 504 timeout error.',
    bureau: 'Technical Support',
    assignedOfficer: 'Er. Sandeep Joshi',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-04T08:30:00+05:30',
    dueDate: '2026-10-09T17:00:00+05:30',
    updatedAt: '2026-10-07T14:10:00+05:30',
    resolutionNotes: 'NIC network gateway certificate renewed and batch token reset in AICTE database for institutional sub-domain. Institutional nodal officer verified successful sync.',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c7-1',
        author: 'Er. Sandeep Joshi',
        role: 'Lead Architect',
        timestamp: '2026-10-06T10:00:00+05:30',
        text: 'Issue identified in DNS reverse proxy resolving old IP. Cleared proxy cache.',
        internalOnly: true
      }
    ],
    history: [
      { id: 'h7-1', timestamp: '2026-10-04T08:30:00+05:30', action: 'Complaint Submitted', actor: 'College Nodal Officer', details: 'Ticket opened for API sync failure.' },
      { id: 'h7-2', timestamp: '2026-10-07T14:10:00+05:30', action: 'Status Changed', actor: 'Er. Sandeep Joshi', details: 'Resolved after system patch.' }
    ]
  },
  {
    id: 'AICTE-2026-008',
    institutionName: 'Chandigarh College of Design & Applied Arts',
    institutionCode: '1-4473829103',
    category: 'Approval & Accreditation',
    description: 'Discrepancy in sanctioned student intake for Master of Design (M.Des) course; college admitted 60 students against approved intake of 30.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Pooja Agarwal',
    priority: 'Critical',
    status: 'Under Review',
    createdAt: '2026-10-18T11:00:00+05:30',
    dueDate: '2026-11-01T17:00:00+05:30',
    updatedAt: '2026-10-25T11:45:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c8-1',
        author: 'Pooja Agarwal',
        role: 'Scrutiny Officer',
        timestamp: '2026-10-20T15:30:00+05:30',
        text: 'Cross-verifying Letter of Approval (LoA) records in Central Server with state DTE allotment lists.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h8-1', timestamp: '2026-10-18T11:00:00+05:30', action: 'Complaint Submitted', actor: 'DTE State Representative', details: 'Intake mismatch report flagged.' },
      { id: 'h8-2', timestamp: '2026-10-20T09:00:00+05:30', action: 'Status Changed', actor: 'Pooja Agarwal', details: 'Under Review.' }
    ]
  },
  {
    id: 'AICTE-2026-009',
    institutionName: 'St. Xavier Institute of Computer Applications, Goa',
    institutionCode: '1-8392019482',
    category: 'Faculty & Staff Grievance',
    description: 'Arbitrary termination of 4 associate professors during academic semester without grievance committee hearing or notice period pay.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Dr. Sudhir Deshmukh',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-15T16:20:00+05:30',
    dueDate: '2026-10-25T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-26T14:15:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Resolution overdue by 1 day; high sensitivity employment dispute.',
      reviewedBy: 'Regional Officer, Western Region',
      reviewedAt: '2026-10-26T15:00:00+05:30',
      actionTaken: 'Interim stay recommended on faculty recruitment till hearing.'
    },
    comments: [
      {
        id: 'c9-1',
        author: 'Dr. Sudhir Deshmukh',
        role: 'Inquiry Officer',
        timestamp: '2026-10-18T10:15:00+05:30',
        text: 'Service contract terms and statutory service book copies sought from governing board.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h9-1', timestamp: '2026-10-15T16:20:00+05:30', action: 'Complaint Submitted', actor: 'Faculty Association', details: 'Formal petition lodged.' }
    ]
  },
  {
    id: 'AICTE-2026-010',
    institutionName: 'Bhubaneswar Polytechnic Institute, Odisha',
    institutionCode: '1-9382019401',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Civil and mechanical workshops lack essential safety gear, fire suppression systems, and machine guards, endangering diploma students.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Kiran Patel',
    priority: 'High',
    status: 'Submitted',
    createdAt: '2026-10-24T12:00:00+05:30',
    dueDate: '2026-11-07T17:00:00+05:30',
    updatedAt: '2026-10-24T12:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h10-1', timestamp: '2026-10-24T12:00:00+05:30', action: 'Complaint Submitted', actor: 'Student Safety Committee', details: 'Initial photographic proof filed.' }
    ]
  },
  {
    id: 'AICTE-2026-011',
    institutionName: 'Karnavati National Institute of Technology, Ahmedabad',
    institutionCode: '1-7291038475',
    category: 'Curriculum & Examination Violation',
    description: 'Unauthorized substitution of core curriculum subjects with unaccredited third-party vendor certifications without board of studies approval.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Meera Krishnan',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-10-17T14:40:00+05:30',
    dueDate: '2026-10-27T17:00:00+05:30', // Due within 48h!
    updatedAt: '2026-10-25T17:10:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c11-1',
        author: 'Meera Krishnan',
        role: 'Academic Consultant',
        timestamp: '2026-10-20T11:00:00+05:30',
        text: 'Syllabus comparison chart generated against model AICTE curriculum.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h11-1', timestamp: '2026-10-17T14:40:00+05:30', action: 'Complaint Submitted', actor: 'Academic Vigilance Cell', details: 'Curriculum variance noted.' }
    ]
  },
  {
    id: 'AICTE-2026-012',
    institutionName: 'Coimbatore Technical Campus, Tamil Nadu',
    institutionCode: '1-6482910394',
    category: 'Harassment & Ragging Redressal',
    description: 'Hostel warden imposing unlawful fines and confiscating mobile phones during study hours without disciplinary council mandate.',
    bureau: 'Grievance Redressal',
    assignedOfficer: 'Kavita Rathore',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-10-01T10:30:00+05:30',
    dueDate: '2026-10-08T17:00:00+05:30',
    updatedAt: '2026-10-06T15:20:00+05:30',
    resolutionNotes: 'College management held meeting with Hostel Welfare Committee. Arbitrary fines revoked and warden issued warning on student rights.',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c12-1',
        author: 'Kavita Rathore',
        role: 'Grievance Officer',
        timestamp: '2026-10-04T12:00:00+05:30',
        text: 'Written undertaking submitted by College Principal that no unauthorized fines will be levied.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h12-1', timestamp: '2026-10-01T10:30:00+05:30', action: 'Complaint Submitted', actor: 'Student Council', details: 'Filed via student grievance portal.' },
      { id: 'h12-2', timestamp: '2026-10-06T15:20:00+05:30', action: 'Status Changed', actor: 'Kavita Rathore', details: 'Case marked as Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-013',
    institutionName: 'Indore Institute of Management Studies, MP',
    institutionCode: '1-3849201948',
    category: 'Fee Irregularities & Capitation Fee',
    description: 'Charging INR 15,000 as mandatory alumni network lifetime fee at time of final degree transcript clearance.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Shri Amitabh Verma',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-12T09:15:00+05:30',
    dueDate: '2026-10-24T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-25T12:00:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Overdue by 2 days without institute accounts submission.',
      reviewedBy: 'Deputy Director (Finance)',
      reviewedAt: '2026-10-25T16:00:00+05:30',
      actionTaken: 'Final 48-hour compliance reminder issued before penalty calculation.'
    },
    comments: [
      {
        id: 'c13-1',
        author: 'Shri Amitabh Verma',
        role: 'Bureau Head',
        timestamp: '2026-10-15T14:30:00+05:30',
        text: 'Mandatory alumni fee violates circular AICTE/Fee/2025/11. Formal directive dispatched.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h13-1', timestamp: '2026-10-12T09:15:00+05:30', action: 'Complaint Submitted', actor: 'Graduating Batch Association', details: 'Receipt evidence uploaded.' }
    ]
  },
  {
    id: 'AICTE-2026-014',
    institutionName: 'Ranchi College of Mining & Geological Engineering',
    institutionCode: '1-5930291847',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Non-availability of designated ambulance and first-aid medical facility in high-risk campus mining machinery training ground.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Dr. Rameshwar Sharma',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-19T11:45:00+05:30',
    dueDate: '2026-10-27T17:00:00+05:30', // Due within 48h!
    updatedAt: '2026-10-26T09:30:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c14-1',
        author: 'Dr. Rameshwar Sharma',
        role: 'Bureau Head',
        timestamp: '2026-10-21T16:00:00+05:30',
        text: 'College reports MoU signed with District Hospital for dedicated campus EMT vehicle. Awaiting copy of vehicle deployment log.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h14-1', timestamp: '2026-10-19T11:45:00+05:30', action: 'Complaint Submitted', actor: 'Staff Safety Representative', details: 'Critical safety violation report.' }
    ]
  },
  {
    id: 'AICTE-2026-015',
    institutionName: 'NCR Institute of Applied Computing, Greater Noida',
    institutionCode: '1-2948192039',
    category: 'Portal & Technical Glitch',
    description: 'Institutional dashboard unable to submit faculty appraisal records for 2026 mandatory evaluation due to validation schema error.',
    bureau: 'Technical Support',
    assignedOfficer: 'Mohit Bansal',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-09-20T11:00:00+05:30',
    dueDate: '2026-09-25T17:00:00+05:30',
    updatedAt: '2026-09-24T16:00:00+05:30',
    resolutionNotes: 'Backend schema patch applied to support hyphenated Aadhaar token hashes. All 142 records submitted successfully.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h15-1', timestamp: '2026-09-20T11:00:00+05:30', action: 'Complaint Submitted', actor: 'IT Registrar', details: 'Tech ticket logged.' },
      { id: 'h15-2', timestamp: '2026-09-24T16:00:00+05:30', action: 'Status Changed', actor: 'Mohit Bansal', details: 'Resolved and closed.' }
    ]
  },
  {
    id: 'AICTE-2026-016',
    institutionName: 'Guwahati Royal College of Technology, Assam',
    institutionCode: '1-4920194856',
    category: 'Faculty & Staff Grievance',
    description: 'Non-issuance of salary slips and provident fund (PF) deduction statements for contractual non-teaching lab assistants.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Rekha Das',
    priority: 'Medium',
    status: 'Under Review',
    createdAt: '2026-10-16T14:10:00+05:30',
    dueDate: '2026-10-28T17:00:00+05:30', // Due within 48h!
    updatedAt: '2026-10-24T12:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h16-1', timestamp: '2026-10-16T14:10:00+05:30', action: 'Complaint Submitted', actor: 'Staff Association', details: 'PF compliance query.' }
    ]
  },
  {
    id: 'AICTE-2026-017',
    institutionName: 'Dehradun Himalayan Institute of Pharmacy',
    institutionCode: '1-7492019483',
    category: 'Admission & Refund Irregularity',
    description: 'Refusal to return original Class 10/12 marksheets and migration certificates deposited during provisional seat booking.',
    bureau: 'Grievance Redressal',
    assignedOfficer: 'Anand Swamy',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-09T10:00:00+05:30',
    dueDate: '2026-10-16T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-22T17:00:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Statutory violation: AICTE prohibits retention of original certificates under any circumstances.',
      reviewedBy: 'Ombudsman Liaison Desk',
      reviewedAt: '2026-10-23T10:00:00+05:30',
      actionTaken: 'Direct phone notice served to College Registrar; compliance report mandatory within 24h.'
    },
    comments: [
      {
        id: 'c17-1',
        author: 'Anand Swamy',
        role: 'Grievance Officer',
        timestamp: '2026-10-12T11:00:00+05:30',
        text: 'Citing Public Notice No. AICTE/Legal/2026/02 prohibiting original document retention.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h17-1', timestamp: '2026-10-09T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Student Legal Guardian', details: 'Certificate retention complaint.' }
    ]
  },
  {
    id: 'AICTE-2026-018',
    institutionName: 'Amritsar Technical Institute of Architecture',
    institutionCode: '1-6928104928',
    category: 'Curriculum & Examination Violation',
    description: 'Improper evaluation of mid-semester design jury; external evaluators were not certified registered architects as per Council of Architecture norms.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Prof. Ananya Sen',
    priority: 'Medium',
    status: 'Under Review',
    createdAt: '2026-10-22T09:30:00+05:30',
    dueDate: '2026-11-01T17:00:00+05:30',
    updatedAt: '2026-10-25T14:30:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h18-1', timestamp: '2026-10-22T09:30:00+05:30', action: 'Complaint Submitted', actor: 'Batch Representative', details: 'Jury qualification dispute.' }
    ]
  },
  {
    id: 'AICTE-2026-019',
    institutionName: 'Visakhapatnam Ocean Engineering Academy',
    institutionCode: '1-8492019482',
    category: 'Portal & Technical Glitch',
    description: 'Payment gateway deduplication failure during AICTE national portal extension-of-approval fee submission (double debited INR 2,50,000).',
    bureau: 'Technical Support',
    assignedOfficer: 'Deepa Rao',
    priority: 'High',
    status: 'Resolved',
    createdAt: '2026-10-05T15:20:00+05:30',
    dueDate: '2026-10-10T17:00:00+05:30',
    updatedAt: '2026-10-08T11:00:00+05:30',
    resolutionNotes: 'Transaction reconciliation performed with SBI e-Pay gateway. Duplicate charge reversed to institute ICICI current account. Transaction ID confirmed.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h19-1', timestamp: '2026-10-05T15:20:00+05:30', action: 'Complaint Submitted', actor: 'Accounts Officer', details: 'Double deduction payment slip attached.' },
      { id: 'h19-2', timestamp: '2026-10-08T11:00:00+05:30', action: 'Status Changed', actor: 'Deepa Rao', details: 'Resolved successfully.' }
    ]
  },
  {
    id: 'AICTE-2026-020',
    institutionName: 'Trivandrum Institute of Nanotechnology & Biotech',
    institutionCode: '1-3829104829',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Failure to maintain operational cleanroom laminar flow hoods in recombinant DNA research facility.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Dr. Rameshwar Sharma',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-09-15T10:00:00+05:30',
    dueDate: '2026-09-29T17:00:00+05:30',
    updatedAt: '2026-09-28T16:30:00+05:30',
    resolutionNotes: 'Annual maintenance contract executed with vendor. Calibration certificates and biosafety audit approval uploaded to bureau portal.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h20-1', timestamp: '2026-09-15T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Lab Research Scholar', details: 'Equipment maintenance log.' },
      { id: 'h20-2', timestamp: '2026-09-28T16:30:00+05:30', action: 'Status Changed', actor: 'Dr. Rameshwar Sharma', details: 'Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-021',
    institutionName: 'Surat Institute of Polymer Technology & Materials',
    institutionCode: '1-9482019481',
    category: 'Faculty & Staff Grievance',
    description: 'Deputation of full-time teaching faculty for administrative admission canvassing during instructional teaching hours.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Dr. Sudhir Deshmukh',
    priority: 'Low',
    status: 'Awaiting Information',
    createdAt: '2026-10-13T11:00:00+05:30',
    dueDate: '2026-10-23T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-24T16:00:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'No response received from Principal to inquiry note issued on Oct 15.',
      reviewedBy: 'Deputy Director (Academic)',
      reviewedAt: '2026-10-25T11:00:00+05:30',
      actionTaken: 'Reminder notice issued with requirement to submit faculty timetable.'
    },
    comments: [],
    history: [
      { id: 'h21-1', timestamp: '2026-10-13T11:00:00+05:30', action: 'Complaint Submitted', actor: 'Faculty Welfare Association', details: 'Duty roster circular attached.' }
    ]
  },
  {
    id: 'AICTE-2026-022',
    institutionName: 'Kolkata Metropolitan Institute of Hotel Management',
    institutionCode: '1-4820194827',
    category: 'Harassment & Ragging Redressal',
    description: 'Junior students forced to perform late night chores in training kitchens; internal complaint committee chairman unresponsive.',
    bureau: 'Grievance Redressal',
    assignedOfficer: 'Dr. Rajeshwari Nair',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-23T19:30:00+05:30',
    dueDate: '2026-10-30T17:00:00+05:30',
    updatedAt: '2026-10-26T11:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c22-1',
        author: 'Dr. Rajeshwari Nair',
        role: 'Bureau Head',
        timestamp: '2026-10-24T10:00:00+05:30',
        text: 'Direct contact initiated with Institutional Ombudsman. Surprise inspection scheduled within 48 hours.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h22-1', timestamp: '2026-10-23T19:30:00+05:30', action: 'Complaint Submitted', actor: 'Parent Association', details: 'Urgent anti-ragging case.' }
    ]
  },
  {
    id: 'AICTE-2026-023',
    institutionName: 'Bhopal Central Institute of Electronics & IT',
    institutionCode: '1-6281048291',
    category: 'Admission & Refund Irregularity',
    description: 'Collecting unapproved computer lab security surcharge of INR 20,000 not listed in state approved fee regulatory order.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Vikas Singhania',
    priority: 'High',
    status: 'Submitted',
    createdAt: '2026-10-25T14:00:00+05:30',
    dueDate: '2026-11-06T17:00:00+05:30',
    updatedAt: '2026-10-25T14:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h23-1', timestamp: '2026-10-25T14:00:00+05:30', action: 'Complaint Submitted', actor: 'Aggrieved Student', details: 'Challan slip submitted.' }
    ]
  },
  {
    id: 'AICTE-2026-024',
    institutionName: 'Patna Institute of Civil Construction Engineering',
    institutionCode: '1-8492019483',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Surveying labs equipped with non-functional 20-year-old optical theodolites; total stations required under revised curriculum missing.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Kiran Patel',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-10-10T11:00:00+05:30',
    dueDate: '2026-10-24T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-25T15:00:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Overdue by 2 days; institute procurement committee delayed tender release.',
      reviewedBy: 'Approval Scrutiny Bureau',
      reviewedAt: '2026-10-25T16:30:00+05:30',
      actionTaken: 'Mandated purchase order submission within 5 working days.'
    },
    comments: [],
    history: [
      { id: 'h24-1', timestamp: '2026-10-10T11:00:00+05:30', action: 'Complaint Submitted', actor: 'Faculty Association', details: 'Equipment deficiency flagged.' }
    ]
  },
  {
    id: 'AICTE-2026-025',
    institutionName: 'Mangalore Coastal Institute of Technology',
    institutionCode: '1-3849201849',
    category: 'Curriculum & Examination Violation',
    description: 'Evaluation criteria altered without student council notification prior to internal continuous assessment exam.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Meera Krishnan',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-09-18T12:00:00+05:30',
    dueDate: '2026-09-28T17:00:00+05:30',
    updatedAt: '2026-09-27T15:45:00+05:30',
    resolutionNotes: 'Academic Council reinstated initial grading rubric and published revised marksheets with internal audit certification.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h25-1', timestamp: '2026-09-18T12:00:00+05:30', action: 'Complaint Submitted', actor: 'Student Representative', details: 'Assessment circular uploaded.' },
      { id: 'h25-2', timestamp: '2026-09-27T15:45:00+05:30', action: 'Status Changed', actor: 'Meera Krishnan', details: 'Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-026',
    institutionName: 'Gwalior Institute of Engineering & Technology',
    institutionCode: '1-7482910482',
    category: 'Fee Irregularities & Capitation Fee',
    description: 'Imposing penalty of INR 200 per day for late tuition fee deposit during state bank strike period.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Shri Amitabh Verma',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-09-22T09:00:00+05:30',
    dueDate: '2026-10-04T17:00:00+05:30',
    updatedAt: '2026-10-02T16:00:00+05:30',
    resolutionNotes: 'Institute accounts office waived all late fees for the 14-day strike period and adjusted excess receipts against subsequent term fees.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h26-1', timestamp: '2026-09-22T09:00:00+05:30', action: 'Complaint Submitted', actor: 'Parent Welfare Association', details: 'Fine receipt slips attached.' },
      { id: 'h26-2', timestamp: '2026-10-02T16:00:00+05:30', action: 'Status Changed', actor: 'Shri Amitabh Verma', details: 'Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-027',
    institutionName: 'Varanasi Heritage Institute of Engineering',
    institutionCode: '1-9382019485',
    category: 'Faculty & Staff Grievance',
    description: 'Non-constitution of Internal Complaints Committee (ICC) under POSH Act 2013 and absence of external NGO legal member.',
    bureau: 'Grievance Redressal',
    assignedOfficer: 'Dr. Rajeshwari Nair',
    priority: 'Critical',
    status: 'Under Review',
    createdAt: '2026-10-20T10:00:00+05:30',
    dueDate: '2026-10-27T17:00:00+05:30', // Due within 48h!
    updatedAt: '2026-10-25T11:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c27-1',
        author: 'Dr. Rajeshwari Nair',
        role: 'Bureau Head',
        timestamp: '2026-10-21T15:00:00+05:30',
        text: 'Statutory compliance query issued. Institution given deadline to reconstitute ICC with approved advocate/NGO member.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h27-1', timestamp: '2026-10-20T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Women Faculty Cell', details: 'Statutory non-compliance notice.' }
    ]
  },
  {
    id: 'AICTE-2026-028',
    institutionName: 'Nashik Regional College of Pharmacy',
    institutionCode: '1-4829104829',
    category: 'Admission & Refund Irregularity',
    description: 'Refusal to acknowledge student transfer request to sister campus despite vacant approved seat and parent medical transfer.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Prof. Ananya Sen',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-09-12T14:00:00+05:30',
    dueDate: '2026-09-22T17:00:00+05:30',
    updatedAt: '2026-09-21T16:00:00+05:30',
    resolutionNotes: 'Transfer NOC approved by Regional Office and both participating colleges in accordance with inter-college transfer regulations.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h28-1', timestamp: '2026-09-12T14:00:00+05:30', action: 'Complaint Submitted', actor: 'Candidate', details: 'Transfer petition submitted.' },
      { id: 'h28-2', timestamp: '2026-09-21T16:00:00+05:30', action: 'Status Changed', actor: 'Prof. Ananya Sen', details: 'Resolved and closed.' }
    ]
  },
  {
    id: 'AICTE-2026-029',
    institutionName: 'Kanpur Institute of Leather & Chemical Tech',
    institutionCode: '1-6482910492',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Effluent treatment plant (ETP) non-operational in chemical engineering pilot plant; chemical vapors escaping into surrounding student classrooms.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Dr. Rameshwar Sharma',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-12T11:00:00+05:30',
    dueDate: '2026-10-26T17:00:00+05:30', // Overdue by a few hours
    updatedAt: '2026-10-26T17:30:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Critical environmental safety hazard deadline expired today without environmental safety clearance proof.',
      reviewedBy: 'Vigilance & Oversight Committee',
      reviewedAt: '2026-10-26T18:00:00+05:30',
      actionTaken: 'Instructed immediate suspension of chemical laboratory exercises pending pollution control board certificate.'
    },
    comments: [
      {
        id: 'c29-1',
        author: 'Dr. Rameshwar Sharma',
        role: 'Bureau Head',
        timestamp: '2026-10-15T10:00:00+05:30',
        text: 'State Pollution Control Board joint inspection order forwarded to college administration.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h29-1', timestamp: '2026-10-12T11:00:00+05:30', action: 'Complaint Submitted', actor: 'Student & Local Resident Forum', details: 'Hazardous vapor complaints.' }
    ]
  },
  {
    id: 'AICTE-2026-030',
    institutionName: 'Madurai Institute of Technology & Poly',
    institutionCode: '1-3829104918',
    category: 'Portal & Technical Glitch',
    description: 'Bulk CSV student enrollment upload failing with uninformative Error Code 500 on AICTE National Scholarship Portal module.',
    bureau: 'Technical Support',
    assignedOfficer: 'Er. Sandeep Joshi',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-10-23T11:30:00+05:30',
    dueDate: '2026-10-28T17:00:00+05:30', // Due within 48h
    updatedAt: '2026-10-25T16:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c30-1',
        author: 'Er. Sandeep Joshi',
        role: 'Lead Architect',
        timestamp: '2026-10-24T12:00:00+05:30',
        text: 'Identified invalid UTF-8 control characters in institutional CSV file. Provided sanitization script.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h30-1', timestamp: '2026-10-23T11:30:00+05:30', action: 'Complaint Submitted', actor: 'Scholarship Nodal Officer', details: 'Ticket logged.' }
    ]
  },
  {
    id: 'AICTE-2026-031',
    institutionName: 'Mysore National Institute of Engineering Sciences',
    institutionCode: '1-8492019402',
    category: 'Faculty & Staff Grievance',
    description: 'Non-grant of maternity leave to contract faculty members and reduction of annual increments during probationary period.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Shri Amitabh Verma',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-11T10:00:00+05:30',
    dueDate: '2026-10-23T17:00:00+05:30', // Overdue
    updatedAt: '2026-10-24T14:00:00+05:30',
    resolutionNotes: '',
    escalation: {
      isEscalated: true,
      reason: 'Breach of Maternity Benefit Act statutory provisions; 3 days overdue.',
      reviewedBy: 'Legal Cell Consultant',
      reviewedAt: '2026-10-24T16:00:00+05:30',
      actionTaken: 'Legal show cause issued to governing body.'
    },
    comments: [],
    history: [
      { id: 'h31-1', timestamp: '2026-10-11T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Aggrieved Faculty Member', details: 'Statutory maternity leave denial.' }
    ]
  },
  {
    id: 'AICTE-2026-032',
    institutionName: 'Agra College of Information & Aeronautical Tech',
    institutionCode: '1-5829104829',
    category: 'Approval and Accreditation',
    description: 'Misrepresentation of built-up area and faculty roster during NBA/AICTE periodic physical scrutiny visit.',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Pooja Agarwal',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-10-14T15:00:00+05:30',
    dueDate: '2026-10-28T17:00:00+05:30', // Due within 48h!
    updatedAt: '2026-10-25T10:30:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c32-1',
        author: 'Pooja Agarwal',
        role: 'Scrutiny Officer',
        timestamp: '2026-10-18T14:00:00+05:30',
        text: 'Cross-verifying satellite geospatial mapping and municipal tax receipts.',
        internalOnly: true
      }
    ],
    history: [
      { id: 'h32-1', timestamp: '2026-10-14T15:00:00+05:30', action: 'Complaint Submitted', actor: 'Vigilance Bureau Referral', details: 'Audit discrepancies.' }
    ]
  },
  {
    id: 'AICTE-2026-033',
    institutionName: 'Thiruvananthapuram Engineering College for Women',
    institutionCode: '1-2948201948',
    category: 'Infrastructure & Lab Deficiencies',
    description: 'Lack of accessible ramps, braille signage, and specialized elevators for differently-abled engineering students (Divyangjan norms).',
    bureau: 'Approval and Accreditation',
    assignedOfficer: 'Kiran Patel',
    priority: 'High',
    status: 'Submitted',
    createdAt: '2026-10-26T10:00:00+05:30',
    dueDate: '2026-11-09T17:00:00+05:30',
    updatedAt: '2026-10-26T10:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h33-1', timestamp: '2026-10-26T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Student Disability Rights Cell', details: 'Accessibility audit report.' }
    ]
  },
  {
    id: 'AICTE-2026-034',
    institutionName: 'Jaipur Technical Institute of Mining',
    institutionCode: '1-6482019481',
    category: 'Curriculum & Examination Violation',
    description: 'Holding mandatory supplementary exams without publishing the internal answer key or conducting moderation committee review.',
    bureau: 'Academic Affairs',
    assignedOfficer: 'Prof. Ananya Sen',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-09-25T11:00:00+05:30',
    dueDate: '2026-10-05T17:00:00+05:30',
    updatedAt: '2026-10-04T15:00:00+05:30',
    resolutionNotes: 'University re-evaluated affected answer scripts under external subject moderation board; revised grade sheets uploaded.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h34-1', timestamp: '2026-09-25T11:00:00+05:30', action: 'Complaint Submitted', actor: 'Student Action Committee', details: 'Exam irregularities.' },
      { id: 'h34-2', timestamp: '2026-10-04T15:00:00+05:30', action: 'Status Changed', actor: 'Prof. Ananya Sen', details: 'Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-035',
    institutionName: 'Nagpur Institute of Advanced Mechatronics',
    institutionCode: '1-7482019482',
    category: 'Fee Irregularities & Capitation Fee',
    description: 'Excess exam hall ticket clearance fee of INR 3,500 levied per semester in violation of AICTE Examination Bye-laws.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Vikas Singhania',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-09-10T10:00:00+05:30',
    dueDate: '2026-09-22T17:00:00+05:30',
    updatedAt: '2026-09-20T14:00:00+05:30',
    resolutionNotes: 'Fee refunded through student bank accounts; receipt proofs submitted to zonal office.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h35-1', timestamp: '2026-09-10T10:00:00+05:30', action: 'Complaint Submitted', actor: 'Parents Council', details: 'Excess charge dispute.' },
      { id: 'h35-2', timestamp: '2026-09-20T14:00:00+05:30', action: 'Status Changed', actor: 'Vikas Singhania', details: 'Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-036',
    institutionName: 'Shimla Himalayan Institute of Technology',
    institutionCode: '1-9382019472',
    category: 'Harassment & Ragging Redressal',
    description: 'Severe ragging incident reported in first-year engineering hostel block; wardens allegedly shielded senior students.',
    bureau: 'Grievance Redressal',
    assignedOfficer: 'Dr. Rajeshwari Nair',
    priority: 'Critical',
    status: 'Under Review',
    createdAt: '2026-10-25T20:00:00+05:30',
    dueDate: '2026-11-01T17:00:00+05:30',
    updatedAt: '2026-10-26T09:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [
      {
        id: 'c36-1',
        author: 'Dr. Rajeshwari Nair',
        role: 'Bureau Head',
        timestamp: '2026-10-26T09:30:00+05:30',
        text: 'FIR registered by local police. Direct report requested from Vice Chancellor within 48 hours.',
        internalOnly: false
      }
    ],
    history: [
      { id: 'h36-1', timestamp: '2026-10-25T20:00:00+05:30', action: 'Complaint Submitted', actor: 'National Anti-Ragging Cell Referral', details: 'Priority 1 case.' }
    ]
  },
  {
    id: 'AICTE-2026-037',
    institutionName: 'Puducherry College of Maritime Logistics',
    institutionCode: '1-4829104920',
    category: 'Portal & Technical Glitch',
    description: 'Institutional digital signature certificate (DSC) mapping error on AICTE web portal during annual compliance filing.',
    bureau: 'Technical Support',
    assignedOfficer: 'Mohit Bansal',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-10-02T11:00:00+05:30',
    dueDate: '2026-10-07T17:00:00+05:30',
    updatedAt: '2026-10-05T16:00:00+05:30',
    resolutionNotes: 'Updated eMudhra crypto USB driver configuration guide provided; DSC token re-registered in PKI store.',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h37-1', timestamp: '2026-10-02T11:00:00+05:30', action: 'Complaint Submitted', actor: 'Registrar Staff', details: 'Portal issue.' },
      { id: 'h37-2', timestamp: '2026-10-05T16:00:00+05:30', action: 'Status Changed', actor: 'Mohit Bansal', details: 'Resolved.' }
    ]
  },
  {
    id: 'AICTE-2026-038',
    institutionName: 'Faridabad Institute of Robotics & Automation',
    institutionCode: '1-8492019484',
    category: 'Faculty & Staff Grievance',
    description: 'Unpaid wages for visiting industry adjunct professors for two consecutive trimesters.',
    bureau: 'Finance and Administration',
    assignedOfficer: 'Shri Amitabh Verma',
    priority: 'High',
    status: 'Submitted',
    createdAt: '2026-10-26T16:00:00+05:30',
    dueDate: '2026-11-07T17:00:00+05:30',
    updatedAt: '2026-10-26T16:00:00+05:30',
    resolutionNotes: '',
    escalation: { isEscalated: false },
    comments: [],
    history: [
      { id: 'h38-1', timestamp: '2026-10-26T16:00:00+05:30', action: 'Complaint Submitted', actor: 'Adjunct Faculty Forum', details: 'Voucher and honorarium bills attached.' }
    ]
  }
];
