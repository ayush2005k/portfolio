// Reliable persistent client-side storage for the original portfolio photo (supports high-res files without localStorage quota limits)
const DB_NAME = 'AyushPortfolioDB';
const STORE_NAME = 'photos';
const PHOTO_KEY = 'hero_portrait';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveOriginalPhoto(dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, PHOTO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to localStorage', err);
  }

  try {
    // Also store in localStorage if size allows for instant synchronous boot
    localStorage.setItem('ayush_portfolio_photo', dataUrl);
  } catch {
    // localStorage quota exceeded, IndexedDB has it covered
  }
}

export async function getOriginalPhoto(): Promise<string | null> {
  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(PHOTO_KEY);
      req.onsuccess = () => resolve((req.result as string) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ayush_portfolio_photo');
    }
    return null;
  }
}

export async function clearOriginalPhoto(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(PHOTO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {}
  try {
    localStorage.removeItem('ayush_portfolio_photo');
  } catch {}
}
