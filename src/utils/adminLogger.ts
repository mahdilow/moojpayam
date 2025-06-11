export interface AdminLogEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  category: 'auth' | 'content' | 'upload' | 'system' | 'security';
  details: {
    method?: string;
    endpoint?: string;
    resourceType?: string;
    resourceId?: string | number;
    oldData?: any;
    newData?: any;
    ipAddress?: string;
    userAgent?: string;
    success: boolean;
    errorMessage?: string;
    metadata?: Record<string, any>;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  sessionId?: string;
}

export class AdminLogger {
  private static instance: AdminLogger;
  private logs: AdminLogEntry[] = [];
  private maxLogs = 10000; // Keep last 10k logs in memory
  
  private constructor() {}
  
  static getInstance(): AdminLogger {
    if (!AdminLogger.instance) {
      AdminLogger.instance = new AdminLogger();
    }
    return AdminLogger.instance;
  }
  
  generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  async log(entry: Omit<AdminLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const logEntry: AdminLogEntry = {
      id: this.generateLogId(),
      timestamp: new Date().toISOString(),
      ...entry
    };
    
    // Add to memory
    this.logs.unshift(logEntry);
    
    // Keep only recent logs in memory
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }
    
    // Save to file (in a real app, this would be async)
    try {
      await this.saveToFile(logEntry);
    } catch (error) {
      console.error('Failed to save admin log:', error);
    }
  }
  
  private async saveToFile(logEntry: AdminLogEntry): Promise<void> {
    // This would typically be handled by the server
    // For now, we'll send it to our logging endpoint
    try {
      await fetch('/api/admin/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(logEntry)
      });
    } catch (error) {
      console.error('Failed to send log to server:', error);
    }
  }
  
  // Helper methods for common log types
  logAuth(action: string, success: boolean, details: any = {}) {
    return this.log({
      adminUser: details.username || 'unknown',
      action,
      category: 'auth',
      details: {
        ...details,
        success,
        ipAddress: details.ipAddress,
        userAgent: details.userAgent
      },
      severity: success ? 'low' : 'high',
      sessionId: details.sessionId
    });
  }
  
  logContentAction(action: string, resourceType: string, resourceId: string | number, oldData: any, newData: any, adminUser: string, success: boolean = true) {
    return this.log({
      adminUser,
      action,
      category: 'content',
      details: {
        resourceType,
        resourceId,
        oldData,
        newData,
        success
      },
      severity: 'medium'
    });
  }
  
  logUpload(action: string, filename: string, adminUser: string, success: boolean, errorMessage?: string) {
    return this.log({
      adminUser,
      action,
      category: 'upload',
      details: {
        resourceType: 'file',
        resourceId: filename,
        success,
        errorMessage
      },
      severity: 'low'
    });
  }
  
  logSecurity(action: string, adminUser: string, details: any = {}) {
    return this.log({
      adminUser,
      action,
      category: 'security',
      details: {
        ...details,
        success: true
      },
      severity: 'critical'
    });
  }
  
  logSystem(action: string, adminUser: string, details: any = {}) {
    return this.log({
      adminUser,
      action,
      category: 'system',
      details: {
        ...details,
        success: true
      },
      severity: 'medium'
    });
  }
}

export const adminLogger = AdminLogger.getInstance();