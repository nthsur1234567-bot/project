
// project/src/assets/Task.ts

export class Task {
  // מאפיינים וטיפוסי הנתונים
  public id: string;
  public name: string;
  public completed: boolean;
  public createdAt: string;

  /**
   * בנאי שמקבל את שם המטלה ויוצר שאר הנתונים אוטומטית.
   */
  constructor(name: string) {
    // יצירת מזהה ייחודי
    this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    this.name = name;
    this.completed = false; // ברירת מחדל: לא הושלמה
    this.createdAt = new Date().toISOString();
  }
}
