import { useEffect, useMemo, useState } from 'react';
import {
  defaultSiteContent,
  getInitialSiteContent,
  loadSiteContent,
  persistSiteContent,
  resetSiteContentToDefault,
  type EditableClass,
  type EditablePartnerGym,
  type EditableTrainer,
  type SiteContent,
} from './content/editableContent';

const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'stride-admin-2026';
const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'strideadmin';

function parseCommaList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function AdminApp() {
  const initialData = useMemo(() => getInitialSiteContent(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [classes, setClasses] = useState<EditableClass[]>(initialData.classes);
  const [partnerGyms, setPartnerGyms] = useState<EditablePartnerGym[]>(initialData.partnerGyms);
  const [trainers, setTrainers] = useState<EditableTrainer[]>(initialData.trainers);
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const loaded = await loadSiteContent();
      if (!active) {
        return;
      }

      setClasses(loaded.classes);
      setPartnerGyms(loaded.partnerGyms);
      setTrainers(loaded.trainers);
    };

    void run();
    return () => {
      active = false;
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== adminUsername || password !== adminPassword) {
      setLoginError('Invalid username or password');
      return;
    }

    setLoginError('');
    setIsLoggedIn(true);
    setUsername('');
    setPassword('');
  };

  const handleSave = async () => {
    const payload: SiteContent = { classes, partnerGyms, trainers };
    setIsSaving(true);
    setSaveMessage('');

    try {
      await persistSiteContent(payload);
      setSaveMessage('Saved. Changes are now shared through the database.');
    } catch {
      setSaveMessage('Save failed. Check Firebase config and Firestore rules.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await resetSiteContentToDefault();
      setClasses(defaultSiteContent.classes);
      setPartnerGyms(defaultSiteContent.partnerGyms);
      setTrainers(defaultSiteContent.trainers);
      setSaveMessage('Reset complete. Default content has been restored.');
    } catch {
      setSaveMessage('Reset failed. Check Firebase config and Firestore rules.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-shell">
        <div className="admin-login-card">
          <p className="admin-eyebrow">Stride Admin</p>
          <h1>Content Manager</h1>
          <p className="admin-note">Login to update classes, trainers, and partner gyms.</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
            />
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit">Login</button>
          </form>
          <p className="admin-note small">Set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in environment for production.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Stride Admin</p>
          <h1>Edit Site Content</h1>
          <p className="admin-note">URL: /admin. Save after changes to apply updates.</p>
        </div>
        <div className="admin-header-actions">
          <button type="button" className="admin-secondary" onClick={() => void handleReset()} disabled={isSaving}>Reset defaults</button>
          <button type="button" className="admin-primary" onClick={() => void handleSave()} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save changes'}</button>
          <button
            type="button"
            className="admin-secondary"
            onClick={() => {
              setIsLoggedIn(false);
              setSaveMessage('');
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {saveMessage && <p className="admin-success">{saveMessage}</p>}

      <section className="admin-section">
        <div className="admin-section-head">
          <h2>Classes</h2>
          <button
            type="button"
            className="admin-secondary"
            onClick={() =>
              setClasses((prev) => [
                ...prev,
                {
                  name: 'New Class',
                  type: 'Group',
                  schedule: 'Mon - 6:00 PM',
                  location: 'Male',
                  intensity: 'Moderate',
                  description: 'Describe the class here.',
                  slots: 12,
                  image: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80',
                },
              ])
            }
          >
            Add class
          </button>
        </div>
        <div className="admin-grid">
          {classes.map((item, index) => (
            <article className="admin-card" key={`class-${index}`}>
              <div className="admin-card-head">
                <h3>Class {index + 1}</h3>
                <button
                  type="button"
                  className="admin-danger"
                  onClick={() => setClasses((prev) => prev.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
              <label>Name<input value={item.name} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, name: e.target.value } : c)))} /></label>
              <label>Type<input value={item.type} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, type: e.target.value } : c)))} /></label>
              <label>Schedule<input value={item.schedule} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, schedule: e.target.value } : c)))} /></label>
              <label>Location<input value={item.location} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, location: e.target.value } : c)))} /></label>
              <label>Intensity<input value={item.intensity} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, intensity: e.target.value } : c)))} /></label>
              <label>Description<textarea rows={4} value={item.description} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, description: e.target.value } : c)))} /></label>
              <label>Image URL<input value={item.image} onChange={(e) => setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, image: e.target.value } : c)))} /></label>
              <label>Slots (leave blank for none)
                <input
                  value={item.slots ?? ''}
                  onChange={(e) => {
                    const raw = e.target.value.trim();
                    const parsed = raw === '' ? null : Number.parseInt(raw, 10);
                    setClasses((prev) => prev.map((c, i) => (i === index ? { ...c, slots: Number.isFinite(parsed) ? parsed : null } : c)));
                  }}
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-head">
          <h2>Partner Gyms</h2>
          <button
            type="button"
            className="admin-secondary"
            onClick={() =>
              setPartnerGyms((prev) => [
                ...prev,
                {
                  name: 'New Partner Gym',
                  location: 'Maldives',
                  description: 'Describe this gym.',
                  features: ['Feature 1', 'Feature 2'],
                  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
                },
              ])
            }
          >
            Add gym
          </button>
        </div>
        <div className="admin-grid">
          {partnerGyms.map((item, index) => (
            <article className="admin-card" key={`gym-${index}`}>
              <div className="admin-card-head">
                <h3>Gym {index + 1}</h3>
                <button
                  type="button"
                  className="admin-danger"
                  onClick={() => setPartnerGyms((prev) => prev.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
              <label>Name<input value={item.name} onChange={(e) => setPartnerGyms((prev) => prev.map((g, i) => (i === index ? { ...g, name: e.target.value } : g)))} /></label>
              <label>Location<input value={item.location} onChange={(e) => setPartnerGyms((prev) => prev.map((g, i) => (i === index ? { ...g, location: e.target.value } : g)))} /></label>
              <label>Description<textarea rows={4} value={item.description} onChange={(e) => setPartnerGyms((prev) => prev.map((g, i) => (i === index ? { ...g, description: e.target.value } : g)))} /></label>
              <label>Image URL<input value={item.image} onChange={(e) => setPartnerGyms((prev) => prev.map((g, i) => (i === index ? { ...g, image: e.target.value } : g)))} /></label>
              <label>Features (comma separated)
                <input
                  value={item.features.join(', ')}
                  onChange={(e) => setPartnerGyms((prev) => prev.map((g, i) => (i === index ? { ...g, features: parseCommaList(e.target.value) } : g)))}
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-head">
          <h2>Trainers</h2>
          <button
            type="button"
            className="admin-secondary"
            onClick={() =>
              setTrainers((prev) => [
                ...prev,
                {
                  name: 'New Trainer',
                  badge: 'Coach',
                  role: 'Trainer',
                  bio: 'Trainer biography',
                  focus: ['Strength'],
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
                },
              ])
            }
          >
            Add trainer
          </button>
        </div>
        <div className="admin-grid">
          {trainers.map((item, index) => (
            <article className="admin-card" key={`trainer-${index}`}>
              <div className="admin-card-head">
                <h3>Trainer {index + 1}</h3>
                <button
                  type="button"
                  className="admin-danger"
                  onClick={() => setTrainers((prev) => prev.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
              <label>Name<input value={item.name} onChange={(e) => setTrainers((prev) => prev.map((t, i) => (i === index ? { ...t, name: e.target.value } : t)))} /></label>
              <label>Badge<input value={item.badge} onChange={(e) => setTrainers((prev) => prev.map((t, i) => (i === index ? { ...t, badge: e.target.value } : t)))} /></label>
              <label>Role<input value={item.role} onChange={(e) => setTrainers((prev) => prev.map((t, i) => (i === index ? { ...t, role: e.target.value } : t)))} /></label>
              <label>Bio<textarea rows={6} value={item.bio} onChange={(e) => setTrainers((prev) => prev.map((t, i) => (i === index ? { ...t, bio: e.target.value } : t)))} /></label>
              <label>Photo URL<input value={item.photo} onChange={(e) => setTrainers((prev) => prev.map((t, i) => (i === index ? { ...t, photo: e.target.value } : t)))} /></label>
              <label>Focus tags (comma separated)
                <input
                  value={item.focus.join(', ')}
                  onChange={(e) => setTrainers((prev) => prev.map((t, i) => (i === index ? { ...t, focus: parseCommaList(e.target.value) } : t)))}
                />
              </label>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminApp;
