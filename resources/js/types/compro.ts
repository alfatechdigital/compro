export type UserRole = 'owner' | 'ceo' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  skills: string[];
  active: boolean;
  photoUrl: string;
  phone?: string;
  title?: string;
}

export type ProjectStatus = 
  | 'lead' 
  | 'negotiation' 
  | 'deal' 
  | 'development' 
  | 'review' 
  | 'completed' 
  | 'cancelled';

export interface Project {
  id: string;
  name: string;
  clientId?: string;
  clientName: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  deadline: string;
  projectValue: number;
  picId: string;
  picName: string;
  picRole?: string;
  picPhoto?: string;
  technologies: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  assigneeId: string;
  assigneeName?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'follow_up' 
  | 'meeting' 
  | 'proposal' 
  | 'negotiation' 
  | 'won' 
  | 'lost';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  source: string;
  potentialProject: string;
  estimatedValue: number;
  status: LeadStatus;
  nextFollowUp?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyService {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export interface CompanyProduct {
  id: string;
  name: string;
  desc: string;
}

export interface CompanyFaq {
  question: string;
  answer: string;
}

export interface CompanyProfile {
  id: string;
  companyName: string;
  description: string;
  about: string;
  services: CompanyService[];
  products: CompanyProduct[];
  contact: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  faq: CompanyFaq[];
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl: string;
  completionDate: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ContentStatus = 'idea' | 'draft' | 'review' | 'approved' | 'scheduled' | 'published';
export type ContentPlatform = 'instagram' | 'facebook' | 'tiktok' | 'linkedin';

export interface ContentItem {
  id: string;
  title: string;
  caption: string;
  platform: ContentPlatform;
  contentType: string;
  mediaUrl?: string;
  status: ContentStatus;
  scheduledAt: string;
  assigneeId: string;
  assigneeName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 
  | 'project_income' 
  | 'project_expense' 
  | 'company_expense' 
  | 'capital' 
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  projectId?: string;
  projectName?: string;
  description: string;
  amount: number;
  date: string;
  createdBy: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'project' | 'lead' | 'content' | 'transaction' | 'task' | 'portfolio' | 'team';
  entityId: string;
  details: string;
  performedBy: string;
  performedByName: string;
  createdAt: string;
}
