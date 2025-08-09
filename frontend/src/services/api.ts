// Debug logging
console.log('🟡 API Service: VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('🟡 API Service: import.meta.env:', import.meta.env);

// Use hardcoded URL as fallback to ensure it works
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jobtracker-backend.onrender.com';

console.log('🟡 API Service: Final API_BASE_URL:', API_BASE_URL);

// Mock data for development - persisted in localStorage
const getMockApplications = (): any[] => {
  const stored = localStorage.getItem('mockApplications');
  return stored ? JSON.parse(stored) : [];
};

const setMockApplications = (applications: any[]) => {
  localStorage.setItem('mockApplications', JSON.stringify(applications));
};

let mockApplications: any[] = getMockApplications();

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

interface ApplicationsResponse {
  applications: any[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface ApplicationResponse {
  application: any;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    console.log('Getting auth headers, token exists:', !!token);
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    console.log('🟡 ApiService: handleResponse called with response status:', response.status);
    console.log('🟡 ApiService: Response ok:', response.ok);
    
    const data = await response.json();
    console.log('🟡 ApiService: Parsed response data:', data);
    
    if (!response.ok) {
      console.error('🟡 ApiService: Response not ok, throwing error');
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    // Transform MongoDB _id to id for frontend compatibility
    if (data.data) {
      if (data.data.applications) {
        console.log('🟡 ApiService: Transforming applications array, count:', data.data.applications.length);
        data.data.applications = data.data.applications.map((app: any) => {
          console.log('🟡 ApiService: Transforming app with _id:', app._id, 'to id:', app._id);
          return {
            ...app,
            id: app._id,
            appliedDate: new Date(app.appliedDate),
            nextInterviewDate: app.nextInterviewDate ? new Date(app.nextInterviewDate) : undefined,
            createdAt: new Date(app.createdAt),
            updatedAt: new Date(app.updatedAt)
          };
        });
      } else if (data.data.application) {
        const app = data.data.application;
        console.log('🟡 ApiService: Transforming single application with _id:', app._id, 'to id:', app._id);
        data.data.application = {
          ...app,
          id: app._id,
          appliedDate: new Date(app.appliedDate),
          nextInterviewDate: app.nextInterviewDate ? new Date(app.nextInterviewDate) : undefined,
          createdAt: new Date(app.createdAt),
          updatedAt: new Date(app.updatedAt)
        };
      } else if (data.data.connections) {
        console.log('🟡 ApiService: Transforming connections array, count:', data.data.connections.length);
        data.data.connections = data.data.connections.map((conn: any) => {
          console.log('🟡 ApiService: Transforming connection with _id:', conn._id, 'to id:', conn._id);
          return {
            ...conn,
            id: conn._id,
            dateAdded: new Date(conn.dateAdded),
            lastContact: new Date(conn.lastContact),
            createdAt: new Date(conn.createdAt),
            updatedAt: new Date(conn.updatedAt)
          };
        });
      } else if (data.data.connection) {
        const conn = data.data.connection;
        console.log('🟡 ApiService: Transforming single connection with _id:', conn._id, 'to id:', conn._id);
        data.data.connection = {
          ...conn,
          id: conn._id,
          dateAdded: new Date(conn.dateAdded),
          lastContact: new Date(conn.lastContact),
          createdAt: new Date(conn.createdAt),
          updatedAt: new Date(conn.updatedAt)
        };
      }
    }
    
    console.log('🟡 ApiService: Returning transformed response data');
    return data;
  }

  // Check if backend is available
  private async isBackendAvailable(): Promise<boolean> {
    console.log('🟡 ApiService: Checking if backend is available at:', `${API_BASE_URL}/health`);
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { 
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Add timeout to prevent long waits
        signal: AbortSignal.timeout(5000)
      });
      console.log('🟡 ApiService: Health check response status:', response.status);
      console.log('🟡 ApiService: Health check response ok:', response.ok);
      return response.ok;
    } catch (error) {
      console.log('🟡 ApiService: Backend not available, using mock API. Error:', error);
      return false;
    }
  }

  // Real backend implementation for createApplication
  async createApplication(applicationData: any): Promise<ApiResponse<ApplicationResponse>> {
    console.log('🟡 ApiService: createApplication called with data:', applicationData);
    console.log('🟡 ApiService: API_BASE_URL:', API_BASE_URL);
    
    console.log('🟡 ApiService: Using REAL backend for createApplication');
    console.log('🟡 ApiService: Making fetch request to:', `${API_BASE_URL}/applications`);
    console.log('🟡 ApiService: Request headers:', this.getAuthHeaders());
    console.log('🟡 ApiService: Request body:', JSON.stringify(applicationData));
    
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(applicationData),
      });
      
      console.log('🟡 ApiService: Real backend response status:', response.status);
      console.log('🟡 ApiService: Real backend response ok:', response.ok);
      
      return this.handleResponse<ApplicationResponse>(response);
    } catch (error) {
      console.error('🟡 ApiService: Error calling real backend:', error);
      throw error;
    }
  }

  // Real backend implementation for getApplications
  async getApplications(params?: {
    page?: number;
    limit?: number;
    status?: string;
    outcome?: string;
    source?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<ApplicationsResponse>> {
    console.log('🟡 ApiService: Getting applications with params:', params);
    
    console.log('🟡 ApiService: Using REAL backend for getApplications');
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const url = `${API_BASE_URL}/applications?${searchParams}`;
    console.log('🟡 ApiService: Making request to:', url);
    
    try {
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<ApplicationsResponse>(response);
    } catch (error) {
      console.error('🟡 ApiService: Error calling real backend:', error);
      throw error;
    }
  }

  // Authentication - Real backend implementation
  async register(userData: { fullName: string; email: string; password: string }) {
    console.log('🟡 ApiService: Using REAL backend for register');
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async login(credentials: { email: string; password: string }) {
    console.log('🟡 ApiService: Using REAL backend for login');
    console.log('🟡 ApiService: Login URL:', `${API_BASE_URL}/auth/login`);
    console.log('🟡 ApiService: Login credentials:', { email: credentials.email, password: '***' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });
      console.log('🟡 ApiService: Login response status:', response.status);
      console.log('🟡 ApiService: Login response ok:', response.ok);
      return this.handleResponse(response);
    } catch (error) {
      console.error('🟡 ApiService: Login fetch error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    console.log('🟡 ApiService: Using REAL backend for getCurrentUser');
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updatePassword(passwords: { currentPassword: string; newPassword: string }) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/auth/updatepassword`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(passwords),
      });
      return this.handleResponse(response);
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        status: 'success',
        message: 'Password updated successfully'
      };
    }
  }

  // Applications
  async getApplication(id: string) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      const application = mockApplications.find(app => app.id === id);
      if (!application) {
        throw new Error('Application not found');
      }
      
      return {
        status: 'success',
        data: { application }
      };
    }
  }

  async updateApplication(id: string, applicationData: any) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(applicationData),
      });
      return this.handleResponse(response);
    } else {
      const index = mockApplications.findIndex(app => app.id === id);
      if (index === -1) {
        throw new Error('Application not found');
      }
      
      mockApplications[index] = {
        ...mockApplications[index],
        ...applicationData,
        updatedAt: new Date().toISOString()
      };
      setMockApplications(mockApplications);
      
      return {
        status: 'success',
        data: { application: mockApplications[index] }
      };
    }
  }

  async deleteApplication(id: string) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      const index = mockApplications.findIndex(app => app.id === id);
      if (index === -1) {
        throw new Error('Application not found');
      }
      
      mockApplications.splice(index, 1);
      setMockApplications(mockApplications);
      
      return {
        status: 'success',
        message: 'Application deleted successfully'
      };
    }
  }

  async getApplicationStats() {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/stats`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      const stats = {
        totalApplications: mockApplications.length,
        appliedCount: mockApplications.filter(app => app.status === 'Applied').length,
        interviewingCount: mockApplications.filter(app => 
          ['Technical Round 1', 'Technical Round 2', 'HR Round'].includes(app.status)
        ).length,
        selectedCount: mockApplications.filter(app => app.outcome === 'Selected').length,
        rejectedCount: mockApplications.filter(app => app.outcome === 'Rejected').length
      };
      
      return {
        status: 'success',
        data: { stats }
      };
    }
  }

  // Interview Rounds
  async addInterviewRound(applicationId: string, roundData: any) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/interview-rounds`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(roundData),
      });
      return this.handleResponse(response);
    } else {
      const application = mockApplications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const round = {
        id: Date.now().toString(),
        ...roundData,
        createdAt: new Date().toISOString()
      };
      
      if (!application.interviewRounds) {
        application.interviewRounds = [];
      }
      
      application.interviewRounds.push(round);
      
      return {
        status: 'success',
        data: { round }
      };
    }
  }

  async updateInterviewRound(applicationId: string, roundId: string, roundData: any) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/interview-rounds/${roundId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(roundData),
      });
      return this.handleResponse(response);
    } else {
      const application = mockApplications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const round = application.interviewRounds?.find((r: any) => r.id === roundId);
      if (!round) {
        throw new Error('Interview round not found');
      }
      
      Object.assign(round, roundData, { updatedAt: new Date().toISOString() });
      
      return {
        status: 'success',
        data: { round }
      };
    }
  }

  async deleteInterviewRound(applicationId: string, roundId: string) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/interview-rounds/${roundId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      const application = mockApplications.find(app => app.id === applicationId);
      if (!application) {
        throw new Error('Application not found');
      }
      
      const roundIndex = application.interviewRounds?.findIndex((r: any) => r.id === roundId);
      if (roundIndex === -1) {
        throw new Error('Interview round not found');
      }
      
      application.interviewRounds.splice(roundIndex, 1);
      
      return {
        status: 'success',
        message: 'Interview round deleted successfully'
      };
    }
  }

  // User Management
  async updateProfile(profileData: { fullName?: string; preferences?: any }) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      return this.handleResponse(response);
    } else {
      const mockUser = localStorage.getItem('mockUser');
      if (mockUser) {
        const user = JSON.parse(mockUser);
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
      }
      
      return {
        status: 'success',
        message: 'Profile updated successfully'
      };
    }
  }

  async upgradeToPro(paymentData: { paymentMethod: string; paymentId: string }) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/users/upgrade-pro`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentData),
      });
      return this.handleResponse(response);
    } else {
      return {
        status: 'success',
        message: 'Upgraded to Pro successfully'
      };
    }
  }

  async cancelPro() {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/users/cancel-pro`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      return {
        status: 'success',
        message: 'Pro subscription cancelled'
      };
    }
  }

  async getUserAnalytics() {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/users/analytics`, {
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      return {
        status: 'success',
        data: {
          totalApplications: mockApplications.length,
          applicationsThisMonth: mockApplications.filter(app => {
            const appDate = new Date(app.createdAt);
            const now = new Date();
            return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
          }).length
        }
      };
    }
  }

  async deleteAccount(password: string) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/users/account`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ password }),
      });
      return this.handleResponse(response);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('mockUser');
      mockApplications = [];
      setMockApplications(mockApplications);
      
      return {
        status: 'success',
        message: 'Account deleted successfully'
      };
    }
  }

  // File Uploads
  async uploadResume(file: File) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/upload/resume`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      return this.handleResponse(response);
    } else {
      console.log('Mock upload resume:', file.name);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        status: 'success',
        data: {
          filename: `mock-resume-${Date.now()}.pdf`,
          url: 'https://mock-storage.com/resume.pdf'
        }
      };
    }
  }

  async uploadDocuments(files: File[]) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('documents', file);
      });

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/upload/documents`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      return this.handleResponse(response);
    } else {
      console.log('Mock upload documents:', files.map(f => f.name));
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        status: 'success',
        data: {
          files: files.map((file, index) => ({
            filename: `mock-doc-${Date.now()}-${index}.pdf`,
            url: `https://mock-storage.com/doc-${index}.pdf`
          }))
        }
      };
    }
  }

  async deleteFile(filename: string) {
    const backendAvailable = await this.isBackendAvailable();
    
    if (backendAvailable) {
      const response = await fetch(`${API_BASE_URL}/upload/${filename}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse(response);
    } else {
      return {
        status: 'success',
        message: 'File deleted successfully'
      };
    }
  }

  // Health Check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }

  // Connection methods
  async getConnections(): Promise<ApiResponse<{ connections: any[] }>> {
    console.log('🟡 ApiService: getConnections called');
    try {
      const response = await fetch(`${API_BASE_URL}/connections`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<{ connections: any[] }>(response);
    } catch (error) {
      console.error('🟡 ApiService: getConnections error:', error);
      throw error;
    }
  }

  async createConnection(connectionData: {
    name: string;
    company: string;
    position: string;
    email?: string;
    linkedin?: string;
    status?: 'active' | 'pending' | 'inactive';
    notes?: string;
    tags?: string[];
  }): Promise<ApiResponse<{ connection: any }>> {
    console.log('🟡 ApiService: createConnection called with data:', connectionData);
    try {
      const response = await fetch(`${API_BASE_URL}/connections`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(connectionData),
      });

      return await this.handleResponse<{ connection: any }>(response);
    } catch (error) {
      console.error('🟡 ApiService: createConnection error:', error);
      throw error;
    }
  }

  async updateConnection(id: string, updates: {
    name?: string;
    company?: string;
    position?: string;
    email?: string;
    linkedin?: string;
    status?: 'active' | 'pending' | 'inactive';
    notes?: string;
    tags?: string[];
    lastContact?: Date;
  }): Promise<ApiResponse<{ connection: any }>> {
    console.log('🟡 ApiService: updateConnection called for id:', id, 'with updates:', updates);
    try {
      const response = await fetch(`${API_BASE_URL}/connections/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates),
      });

      return await this.handleResponse<{ connection: any }>(response);
    } catch (error) {
      console.error('🟡 ApiService: updateConnection error:', error);
      throw error;
    }
  }

  async deleteConnection(id: string): Promise<ApiResponse<{ message: string }>> {
    console.log('🟡 ApiService: deleteConnection called for id:', id);
    try {
      const response = await fetch(`${API_BASE_URL}/connections/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<{ message: string }>(response);
    } catch (error) {
      console.error('🟡 ApiService: deleteConnection error:', error);
      throw error;
    }
  }

  // Message sending methods
  async sendMessage(messageData: {
    to: string;
    email: string;
    subject: string;
    message: string;
    type: string;
  }): Promise<ApiResponse<{ messageId: string; sentAt: string; recipient: string; subject: string; type: string }>> {
    console.log('🟡 ApiService: sendMessage called with data:', messageData);
    try {
      const response = await fetch(`${API_BASE_URL}/messages/send`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(messageData),
      });

      return await this.handleResponse<{ messageId: string; sentAt: string; recipient: string; subject: string; type: string }>(response);
    } catch (error) {
      console.error('🟡 ApiService: sendMessage error:', error);
      throw error;
    }
  }

  async getMessages(): Promise<ApiResponse<{ messages: any[] }>> {
    console.log('🟡 ApiService: getMessages called');
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<{ messages: any[] }>(response);
    } catch (error) {
      console.error('🟡 ApiService: getMessages error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService(); 