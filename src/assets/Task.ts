// src/assets/Task.ts

export class Task {
  public id: string;
  public name: string;
  public completed: boolean;
  public createdAt: string;

  constructor(name: string) {
    // יצירת מזהה ייחודי פשוט
    this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    this.name = name;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }
}
