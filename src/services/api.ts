const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Authentication
  async register(userData: { fullName: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials),
    });
    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updatePassword(passwords: { currentPassword: string; newPassword: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/updatepassword`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passwords),
    });
    return this.handleResponse(response);
  }

  // Applications
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
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/applications?${searchParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<ApplicationsResponse>(response);
  }

  async getApplication(id: string) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createApplication(applicationData: any): Promise<ApiResponse<ApplicationResponse>> {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(applicationData),
    });
    return this.handleResponse<ApplicationResponse>(response);
  }

  async updateApplication(id: string, applicationData: any) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(applicationData),
    });
    return this.handleResponse(response);
  }

  async deleteApplication(id: string) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getApplicationStats() {
    const response = await fetch(`${API_BASE_URL}/applications/stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Interview Rounds
  async addInterviewRound(applicationId: string, roundData: any) {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/interview-rounds`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(roundData),
    });
    return this.handleResponse(response);
  }

  async updateInterviewRound(applicationId: string, roundId: string, roundData: any) {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/interview-rounds/${roundId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(roundData),
    });
    return this.handleResponse(response);
  }

  async deleteInterviewRound(applicationId: string, roundId: string) {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/interview-rounds/${roundId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // User Management
  async updateProfile(profileData: { fullName?: string; preferences?: any }) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }

  async upgradeToPro(paymentData: { paymentMethod: string; paymentId: string }) {
    const response = await fetch(`${API_BASE_URL}/users/upgrade-pro`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    return this.handleResponse(response);
  }

  async cancelPro() {
    const response = await fetch(`${API_BASE_URL}/users/cancel-pro`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getUserAnalytics() {
    const response = await fetch(`${API_BASE_URL}/users/analytics`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async deleteAccount(password: string) {
    const response = await fetch(`${API_BASE_URL}/users/account`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ password }),
    });
    return this.handleResponse(response);
  }

  // File Uploads
  async uploadResume(file: File) {
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
  }

  async uploadDocuments(files: File[]) {
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
  }

  async deleteFile(filename: string) {
    const response = await fetch(`${API_BASE_URL}/upload/${filename}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Health Check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export default apiService; 