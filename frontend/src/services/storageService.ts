export class StorageService {
  private storage: Storage

  constructor(storage: Storage = localStorage) {
    this.storage = storage
  }

  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      this.storage.setItem(key, serializedValue)
    } catch (error) {
      console.error('Error setting item in storage:', error)
      throw new Error('Failed to save data')
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key)
      if (item === null) {
        return null
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error('Error getting item from storage:', error)
      return null
    }
  }

  removeItem(key: string): void {
    try {
      this.storage.removeItem(key)
    } catch (error) {
      console.error('Error removing item from storage:', error)
      throw new Error('Failed to remove data')
    }
  }

  clear(): void {
    try {
      this.storage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
      throw new Error('Failed to clear storage')
    }
  }

  getAllKeys(): string[] {
    try {
      const keys: string[] = []
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i)
        if (key) {
          keys.push(key)
        }
      }
      return keys
    } catch (error) {
      console.error('Error getting all keys from storage:', error)
      return []
    }
  }
}