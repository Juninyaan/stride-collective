// Edit this file to update classes, trainers, and partner gyms without touching the main app code.
// After edits, commit and push to GitHub. Vercel will auto-deploy the updates.

const SITE_CONTENT_STORAGE_KEY = 'stride_site_content_v1';

export type EditableClass = {
  name: string;
  type: string;
  schedule: string;
  location: string;
  intensity: string;
  description: string;
  slots: number | null;
  image: string;
};

export type EditablePartnerGym = {
  name: string;
  location: string;
  description: string;
  features: string[];
  image: string;
};

export type EditableTrainer = {
  name: string;
  badge: string;
  role: string;
  bio: string;
  focus: string[];
  photo: string;
};

export type SiteContent = {
  classes: EditableClass[];
  partnerGyms: EditablePartnerGym[];
  trainers: EditableTrainer[];
};

const defaultClasses: EditableClass[] = [
  {
    name: 'Sunrise Power HIIT',
    type: 'Group · Outdoor',
    schedule: 'Mon / Wed / Fri — 6:00 AM',
    location: 'Male Waterfront',
    intensity: 'High',
    description:
      'Start your day with explosive energy. 45 minutes of interval training combining sprints, plyometrics, and bodyweight circuits. Builds cardiovascular endurance, burns calories fast, and delivers that mental clarity to crush your day.',
    slots: 16,
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Functional Strength Training',
    type: 'Group · Partner Gym',
    schedule: 'Tue / Thu — 6:30 AM & 6:00 PM',
    location: 'Anytime Fitness Male',
    intensity: 'Moderate-High',
    description:
      'Build genuine strength through compound movements - squats, deadlifts, presses, and rows. Smart progression and technique coaching ensure you move better, lift heavier, and build muscle that serves real life. Perfect for both beginners and experienced lifters.',
    slots: 12,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Evening Metabolic Conditioning',
    type: 'Group · Outdoor',
    schedule: 'Mon / Wed / Fri — 5:30 PM',
    location: 'Male Waterfront',
    intensity: 'High',
    description:
      'Finish your workday stronger. Circuit-based metabolic work hitting multiple energy systems - cardio, strength, and power combined. Coach-led, programmed for consistency, and designed to keep your body challenged and engaged as the week progresses.',
    slots: 18,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Mobility & Movement Flow',
    type: 'Group · Outdoor',
    schedule: 'Sat & Sun — 7:00 AM',
    location: 'Hulhumale Beach',
    intensity: 'Low-Moderate',
    description:
      'Restore mobility, improve posture, and sharpen movement quality. Active stretching, foam rolling techniques, and controlled flow sequences that complement your strength training and accelerate recovery. The session you need after a hard week.',
    slots: 20,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Private 1-on-1 Coaching',
    type: 'One-on-One · Flexible',
    schedule: 'By appointment — 7 days',
    location: 'Partner gym or outdoor location',
    intensity: 'Customized',
    description:
      'Your personal blueprint. Totally tailored programming built around your goals, schedule, and preferences. Every session is tracked, every week is progressed, and every result is measured. For clients serious about transformation.',
    slots: null,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Corporate Wellness Programs',
    type: 'Group · On-site',
    schedule: 'Flexible — book for your team',
    location: 'Client venue',
    intensity: 'Inclusive',
    description:
      'Bring fitness to your employees. 30-60 minute branded sessions at your office or venue. Scalable to any fitness level, designed to boost energy, team morale, and organizational wellness culture. Minimum 10 participants.',
    slots: null,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  },
];

const defaultPartnerGyms: EditablePartnerGym[] = [
  {
    name: 'Anytime Fitness Male',
    location: 'Male, Maldives',
    description:
      'Our primary partner facility for equipment-based personal training sessions in Male. Full gym floor access with squat racks, cable machines, and a private coaching bay for one-to-one clients.',
    features: ['Squat racks', 'Cable system', 'Private bay', 'AC facility'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Hulhumale Fitness Hub',
    location: 'Hulhumale, Maldives',
    description:
      'A well-equipped community gym in Hulhumale that gives Stride clients equipment access when conditioning sessions require it. Used primarily for structured strength blocks and progress testing.',
    features: ['Free weights', 'Functional rig', 'Open floor', 'Flexible hours'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
  },
];

const defaultTrainers: EditableTrainer[] = [
  {
    name: 'Ahmed Hassan',
    badge: 'Head Coach',
    role: 'Founder & Lead Coach',
    bio: 'Ahmed established Stride Collective on a simple premise: fitness should be structured, professionally delivered, and accessible to high-performing individuals. With 12+ years in strength coaching and group class management, he has trained everyone from complete beginners rebuilding confidence to competitive athletes refining performance.\n\nHe specializes in programming - building sustainable strength progressions and metabolic conditioning systems that clients actually stick to. When you train with Ahmed, you get precision, accountability, and a clear roadmap to your goals.',
    focus: ['Strength programming', 'Performance coaching', 'System design'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Aminath Rasheed',
    badge: 'Conditioning Specialist',
    role: 'Lead Group Coach & Conditioning Expert',
    bio: 'Aminath brings 8 years of group fitness expertise and a Masters-level background in exercise science. She leads all group conditioning and metabolic sessions with energy, precision cueing, and an uncanny ability to scale intensity for 20 different fitness levels in one room.\n\nHer approach is science-backed but human - she understands why people quit and designs sessions that keep clients coming back. Aminath specializes in body composition transformation and building sustainable training habits.',
    focus: ['Group coaching', 'Body recomposition', 'Habit building'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Khalil Ibrahim',
    badge: 'Personal Training Specialist',
    role: 'Senior Personal Trainer & Movement Coach',
    bio: 'Khalil is the go-to for clients who want white-glove service and elite results. With 10 years of private coaching experience, he has worked with everyone from busy executives to athletes. He combines periodized strength training with mobility expertise - the result is clients who reach their physique goals while actually moving better.\n\nHe handles all private training delivery and is known for exceptional communication, detailed progress tracking, and the ability to make complex programming feel simple. If results matter more than excuses, Khalil is your coach.',
    focus: ['Personal training', 'Mobility & recovery', 'Physique transformation'],
    photo: 'https://images.unsplash.com/photo-1506241312078-07b6142b1160?auto=format&fit=crop&w=900&q=80',
  },
];

export const defaultSiteContent: SiteContent = {
  classes: defaultClasses,
  partnerGyms: defaultPartnerGyms,
  trainers: defaultTrainers,
};

export const editableClasses = defaultSiteContent.classes;
export const editablePartnerGyms = defaultSiteContent.partnerGyms;
export const editableTrainers = defaultSiteContent.trainers;

function safeParseSiteContent(value: string): SiteContent | null {
  try {
    const parsed = JSON.parse(value) as Partial<SiteContent>;
    if (!parsed || !Array.isArray(parsed.classes) || !Array.isArray(parsed.partnerGyms) || !Array.isArray(parsed.trainers)) {
      return null;
    }

    return {
      classes: parsed.classes as EditableClass[],
      partnerGyms: parsed.partnerGyms as EditablePartnerGym[],
      trainers: parsed.trainers as EditableTrainer[],
    };
  } catch {
    return null;
  }
}

export function getSiteContent(): SiteContent {
  if (typeof window === 'undefined') {
    return defaultSiteContent;
  }

  const raw = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
  if (!raw) {
    return defaultSiteContent;
  }

  return safeParseSiteContent(raw) ?? defaultSiteContent;
}

export function saveSiteContent(content: SiteContent): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
}

export function clearSiteContentOverride(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
}
