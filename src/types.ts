export type InsuranceType =
  | 'Health'
  | 'Health Insurance'
  | 'Commercial'
  | 'Commercial Insurance'
  | 'Life'
  | 'Life Insurance'
  | 'Property & Casualty'
  | 'Employee Benefits';

export type ApplicationStatus =
  | 'Quote Requested'
  | 'Application Started'
  | 'Documents Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Policy Issued';

export interface User {
  id: string;
  name: string;
  email: string;
  agencyName: string;
  npn: string; // National Producer Number
  licenseState: string;
  avatarUrl?: string;
  role: 'Broker' | 'Admin';
}

export interface DocumentFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface ApplicationComment {
  id: string;
  author: string;
  role: 'Broker' | 'Underwriter';
  content: string;
  timestamp: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface InsuranceApplication {
  id: string;
  insuranceType: InsuranceType;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyAddress: string;
  state: string;
  zipCode: string;
  effectiveDate: string;
  coverageAmount: string;
  employeesCount: number;
  currentProvider?: string;
  additionalRequirements?: string;
  status: ApplicationStatus;
  submissionDate: string;
  lastUpdated: string;
  estimatedAnnualPremium: number;
  documents: DocumentFile[];
  comments: ApplicationComment[];
  outstandingActions: ActionItem[];
  brokerId: string;
}

export interface Policy {
  id: string;
  policyNumber: string;
  clientName: string;
  product: InsuranceType;
  effectiveDate: string;
  renewalDate: string;
  coverageAmount: string;
  annualPremium: number;
  status: 'Active' | 'Pending Renewal' | 'Expired';
  carrier: string;
  decPageUrl?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Product Guides' | 'Rate Sheets' | 'Application Forms' | 'Claims Information' | 'Broker Guides';
  fileType: 'PDF' | 'XLSX' | 'DOCX';
  fileSize: string;
  updatedDate: string;
  description: string;
  downloadCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Quotes' | 'Underwriting' | 'Claims' | 'Commissions' | 'General';
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  lastMessage: string;
}


