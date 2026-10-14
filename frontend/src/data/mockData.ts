import { ResourceItem, DiscussionPost, CampaignItem, GuidanceQuestion, UserProfile } from '../types';

export const mockUserProfile: UserProfile = {
  name: 'Ananya Sharma',
  email: 'ananya.s@example.com',
  role: 'Parent of 4yo Son (Aarav)',
  location: 'Mumbai, Maharashtra',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  joinedDate: 'January 2025',
  savedResourcesCount: 7,
  completedGuidanceCount: 2,
  communityPostsCount: 5,
  contributionsTotal: 2500,
};

export const mockResources: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Understanding Autism Spectrum Disorder: A Parent\'s First Compass',
    description: 'A compassionate, non-jargon overview of neurodiversity, sensory processing variations, and early supportive measures for your child.',
    category: 'Autism Basics',
    readTime: '6 min read',
    iconName: 'BookOpen',
    author: 'Dr. Meera Vasudevan, Developmental Specialist',
    publishedDate: 'Feb 14, 2026',
    keyTakeaways: [
      'Autism is a natural variation in human brain development, not an illness to be cured.',
      'Early support focuses on communication pathways, sensory comfort, and building upon your child\'s unique strengths.',
      'Observing non-verbal cues and emotional state helps foster strong caregiver bonding.'
    ],
    content: [
      'Receiving initial observations about your child\'s developmental pace can bring a wave of mixed emotions. It is completely natural to feel overwhelmed, but remember: your child is the exact same loving individual today as they were yesterday.',
      'Autism Spectrum Disorder (ASD) represents a spectrum of unique neurodivergent profiles. Some children have remarkable verbal vocabularies but experience sensory overload in noisy rooms; others communicate effortlessly through gestures, visual cards, or digital devices.',
      'Understanding your child\'s specific sensory processing preferences (such as seeking firm hugs or avoiding fluorescent lighting) builds a peaceful home routine. Early intervention is not about changing who your child is — it is about equipping them with tools to navigate the world confidently.'
    ]
  },
  {
    id: 'res-2',
    title: 'Spotting Early Developmental Signs & Sensory Nuances',
    description: 'Learn how to observe subtle communication patterns, eye contact preferences, and motor milestones in toddlers aged 18-36 months.',
    category: 'Early Signs',
    readTime: '8 min read',
    iconName: 'Sparkles',
    author: 'Rajesh Nair, M.Ed. Special Educator',
    publishedDate: 'Jan 28, 2026',
    keyTakeaways: [
      'Look for joint attention: whether your child points to show you an item of interest.',
      'Sensory seeking (spinning objects, lining up cars) can be comforting self-regulation activities.',
      'Differences in speech progression vary widely and can be complemented with AAC (Augmentative Communication).'
    ],
    content: [
      'Every child grows at their own unique pace. When observing early developmental milestones, caregivers often wonder about subtle cues like response to name, eye contact duration, or hand-flapping during moments of delight.',
      'Sensory behaviors, such as lining up colorful blocks or rocking gently, are often natural ways children self-regulate their internal energy. Understanding these cues helps parents create supportive environments rather than penalizing repetitive motions.',
      'If you notice consistent gaps in social reciprocity or speech repetition, bringing clear notes to your pediatrician allows for timely, supportive early intervention strategies.'
    ]
  },
  {
    id: 'res-3',
    title: 'Navigating Speech & Occupational Therapy: What to Expect',
    description: 'A step-by-step guide to setting realistic goals, selecting compassionate therapists, and continuing home play activities.',
    category: 'Therapy',
    readTime: '10 min read',
    iconName: 'Activity',
    author: 'Priya Kulkarni, Senior Speech Language Pathologist',
    publishedDate: 'Feb 02, 2026',
    keyTakeaways: [
      'Speech therapy encompasses oral motor skills, gestures, picture communication, and social interaction.',
      'Occupational therapy addresses fine motor skills, body awareness, and sensory integration.',
      'Consistency between therapy sessions and home routines accelerates comfort and confidence.'
    ],
    content: [
      'Starting therapy sessions can feel like embarking on a new routine. Speech Language Pathologists (SLPs) and Occupational Therapists (OTs) work collaboratively with parents to establish fun, play-based routines.',
      'Therapy should always respect the child\'s dignity and emotional boundary. High-quality therapeutic care uses positive reinforcement, visual schedules, and sensory breaks.',
      'Parent involvement is vital: simple daily rituals like singing nursery rhymes with visual hand actions or encouraging sensory play with kinetic sand reinforce therapy goals at home.'
    ]
  },
  {
    id: 'res-4',
    title: 'Inclusive School Education & IEP Planning Guide',
    description: 'How to partner with schools, request Individualized Education Plans (IEPs), and advocate for classroom accommodations.',
    category: 'Education',
    readTime: '7 min read',
    iconName: 'GraduationCap',
    author: 'Sunita Deshmukh, Inclusive Education Advocate',
    publishedDate: 'Jan 15, 2026',
    keyTakeaways: [
      'An IEP outlines tailored academic goals, sensory accommodations, and examination extra time allowances.',
      'Shadow teachers and resource rooms assist children in transitioning into mainstream classrooms.',
      'Regular positive communication with class teachers builds a supportive learning environment.'
    ],
    content: [
      'Every child has the legal and fundamental right to an inclusive, respectful education. Preparing your child for preschool or primary school involves creating a clear Individualized Education Plan (IEP).',
      'Accommodations such as noise-canceling headphones during assembly, visual desk schedules, and extra time during written assessments can transform a student\'s school experience.',
      'Work closely with your school administration to train staff on sensory triggers and positive behavioral support.'
    ]
  },
  {
    id: 'res-5',
    title: 'Caregiver Mental Wellbeing & Burnout Prevention',
    description: 'Practical self-compassion strategies, respite care ideas, and emotional wellness routines for dedicated parents.',
    category: 'Parenting',
    readTime: '5 min read',
    iconName: 'HeartHandshake',
    author: 'Dr. Amitav Banerjee, Clinical Psychologist',
    publishedDate: 'Feb 20, 2026',
    keyTakeaways: [
      'Caregiver burnout is real; taking personal time is necessary for sustained parenting.',
      'Connecting with peer support groups removes isolation and provides practical shared advice.',
      'Celebrating small daily micro-victories nurtures joy in your family journey.'
    ],
    content: [
      'As a caregiver, your physical and emotional well-being is the foundation of your family\'s happiness. Pouring energy into appointments, home therapy, and school advocacy can lead to caregiver fatigue.',
      'Set aside 15 minutes daily for non-parenting activities — whether drinking tea in silence, reading a favorite book, or taking a brisk morning walk.',
      'Never hesitate to lean on your community. Sharing your true feelings in safe support groups reminds you that your feelings are valid and fully shared by others.'
    ]
  },
  {
    id: 'res-6',
    title: 'Government Disability Certificates & Rights Handbook (India)',
    description: 'Clear walkthrough of applying for UDID cards, tax concessions under Sec 80DD, and railway/airline concessions.',
    category: 'Government Resources',
    readTime: '12 min read',
    iconName: 'FileText',
    author: 'Legal Rights & Disability Policy Cell',
    publishedDate: 'Feb 10, 2026',
    keyTakeaways: [
      'The Unique Disability ID (UDID) portal streamlines national recognition and welfare benefits.',
      'Tax exemptions under Section 80DD and 80U provide financial relief for ongoing therapeutic expenses.',
      'State-level financial aid and inclusive insurance schemes offer specialized coverage.'
    ],
    content: [
      'Navigating government documentation can seem daunting, but official welfare schemes provide significant financial and social support.',
      'Step 1: Register on the swavlambancard.gov.in portal. Step 2: Schedule an evaluation appointment at a designated District Civil Hospital. Step 3: Receive your digital UDID card.',
      'UDID cardholders unlock travel concessions, specialized education grants, and tax deductions under Indian IT laws.'
    ]
  }
];

export const mockDiscussions: DiscussionPost[] = [
  {
    id: 'disc-1',
    author: 'Pooja R.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    role: 'Mother of 3yo non-verbal boy',
    category: 'Early Intervention',
    title: 'How AAC (Picture Cards) helped our son express his morning routine!',
    content: 'We started introducing PECS (Picture Exchange Communication System) cards 3 months ago when my son was struggling to tell us what he wanted for breakfast. Yesterday, he walked up to the fridge, picked up the "Milk" card and handed it to me with the biggest smile! To any parent starting out, please don\'t lose hope with non-verbal tools — they open up so many doors.',
    timestamp: '2 hours ago',
    likes: 34,
    commentsCount: 12,
    commentsList: [
      {
        id: 'c-1',
        author: 'Siddharth M.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        role: 'Father of 5yo girl',
        content: 'That is such a beautiful breakthrough! We used a digital AAC app on an iPad and it transformed our dinner times.',
        timestamp: '1 hour ago',
        likes: 5
      },
      {
        id: 'c-2',
        author: 'Kavita Joshi',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
        role: 'Special Educator',
        content: 'Wonderful progress Pooja! Giving children a visual voice builds immense emotional confidence and reduces frustration meltdowns.',
        timestamp: '45 mins ago',
        likes: 8
      }
    ]
  },
  {
    id: 'disc-2',
    author: 'Vikram & Swati Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    role: 'Parents of 7yo boy in Grade 1',
    category: 'School & Education',
    title: 'Tips for requesting sensory breaks during school assembly & long classes',
    content: 'Our son used to experience sensory overload during loud school morning assemblies. We met with the school principal and created a small agreement: during assembly loud music, he is allowed to wear noise-canceling headphones or assist the librarian in the quiet room. Teachers have been super supportive. Has anyone else set up similar classroom accommodations?',
    timestamp: '5 hours ago',
    likes: 52,
    commentsCount: 19
  },
  {
    id: 'disc-3',
    author: 'Neha Verma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    role: 'Single mother of 4yo twins',
    category: 'Daily Challenges',
    title: 'Managing haircut sensory distress: what worked for us after 6 months of trials',
    content: 'Haircuts were our biggest nightmare due to clipper sound vibrations and cape touch. We finally tried: 1) Cutting hair at home while watching his favorite train cartoon, 2) Using silent manual scissors instead of electric trimmers, and 3) Deep pressure tactile blanket during the cut. Hope this helps other parents struggling with salon visits!',
    timestamp: '1 day ago',
    likes: 89,
    commentsCount: 31
  },
  {
    id: 'disc-4',
    author: 'Arjun Sen',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    role: 'Father of 6yo girl',
    category: 'Therapy Experiences',
    title: 'How long did it take your child to adjust to Occupational Therapy (OT)?',
    content: 'We are in week 3 of OT for sensory integration. My daughter cries for the first 10 minutes before warming up to the swing and crash pads. I am wondering how long it took for your kids to feel eager about therapy sessions?',
    timestamp: '2 days ago',
    likes: 27,
    commentsCount: 14
  }
];

export const mockCampaigns: CampaignItem[] = [
  {
    id: 'camp-1',
    title: 'Speech & AAC Device Grant for Aarav (Age 5)',
    description: 'Funding a dedicated speech tablet with localized Indian language AAC software and 12 months of specialized speech pathology sessions.',
    category: 'Therapy',
    raised: 72500,
    goal: 100000,
    supporters: 48,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600',
    organizer: 'Autism Support Trust Kolkata',
    location: 'Kolkata, West Bengal',
    daysLeft: 12,
    isUrgent: true
  },
  {
    id: 'camp-2',
    title: 'Sensory Play Room Setup for Rural Special School',
    description: 'Creating a sensory integration room with weighted blankets, bubble tubes, tactile walls, and therapy swings for 35 autistic children in Satara district.',
    category: 'Education',
    raised: 145000,
    goal: 200000,
    supporters: 112,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
    organizer: 'Prerana Inclusive Education Foundation',
    location: 'Satara, Maharashtra',
    daysLeft: 20
  },
  {
    id: 'camp-3',
    title: 'Occupational Therapy Assistance for Ananya',
    description: 'Providing financial assistance for 6 months of intensive fine-motor and sensory balance occupational therapy sessions for 4-year-old Ananya.',
    category: 'Therapy',
    raised: 48000,
    goal: 60000,
    supporters: 32,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    organizer: 'Hope for Children Collective',
    location: 'Bengaluru, Karnataka',
    daysLeft: 8,
    isUrgent: true
  },
  {
    id: 'camp-4',
    title: 'Parent Training Workshops & Resource Toolkits Distribution',
    description: 'Sponsoring free developmental kit boxes (visual schedules, sensory fidget toys, emotion cards) for 100 low-income caregiver families.',
    category: 'Resources',
    raised: 92000,
    goal: 120000,
    supporters: 76,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600',
    organizer: 'Autism Connect Community Fund',
    location: 'New Delhi',
    daysLeft: 15
  }
];

export const mockGuidanceQuestions: GuidanceQuestion[] = [
  {
    id: 'q1',
    category: 'Communication',
    question: 'How does your child respond when you call their name from across a quiet room?',
    description: 'Observe if your child consistently turns, makes eye contact, or acknowledges your voice without visual cues.',
    options: [
      { text: 'Consistently turns and makes eye contact (Usually 90%+ of the time)', score: 0 },
      { text: 'Turns occasionally or only when repeated multiple times loudly', score: 1 },
      { text: 'Rarely turns, appears deeply absorbed in current activity or object', score: 2 },
      { text: 'Responds mainly to familiar musical sounds or preferred video tunes rather than voice', score: 2 }
    ]
  },
  {
    id: 'q2',
    category: 'Communication',
    question: 'How does your child communicate their wants or needs (e.g., asking for water, food, or toys)?',
    description: 'Notice if they use words, point with an index finger, bring your hand to objects, or use gestures.',
    options: [
      { text: 'Uses spoken words or simple clear phrases', score: 0 },
      { text: 'Points clearly with index finger towards desired object', score: 0 },
      { text: 'Leads parent by taking their hand (hand-as-a-tool gesture)', score: 2 },
      { text: 'Expresses needs primarily through crying, pulling, or vocalizing without gestures', score: 2 }
    ]
  },
  {
    id: 'q3',
    category: 'Social Interaction',
    question: 'Does your child engage in "joint attention" (pointing to show you something exciting)?',
    description: 'For example, pointing to an airplane in the sky or a cat walking past to share delight with you.',
    options: [
      { text: 'Frequently points to interesting items while looking back at me', score: 0 },
      { text: 'Points when prompted, but rarely spontaneously shares excitement', score: 1 },
      { text: 'Focuses on the airplane/cat directly without attempting to share with parent', score: 2 },
      { text: 'Does not point to distant objects or look where parent points', score: 2 }
    ]
  },
  {
    id: 'q4',
    category: 'Social Interaction',
    question: 'How does your child interact during peer play or group settings (e.g., park, playdates)?',
    description: 'Observe whether they prefer solitary play, parallel play (playing side-by-side), or interactive game play.',
    options: [
      { text: 'Enjoys interactive turn-taking games (chase, peek-a-boo, passing ball)', score: 0 },
      { text: 'Plays side-by-side quietly near other kids without direct interaction (parallel play)', score: 1 },
      { text: 'Prefers solitary play and may become distressed if other children join', score: 2 },
      { text: 'Focuses strictly on specific object parts (spinning toy wheels) rather than group play', score: 2 }
    ]
  },
  {
    id: 'q5',
    category: 'Daily Activities',
    question: 'How does your child react to sensory stimuli (loud sounds, bright lights, hair washing, cloth tags)?',
    description: 'Sensory preferences vary significantly in neurodivergent children.',
    options: [
      { text: 'Tolerates typical household sounds (vacuum cleaner, blender) comfortably', score: 0 },
      { text: 'Covers ears or shows mild distress during unexpected loud noises', score: 1 },
      { text: 'Shows intense distress (crying, running away) during haircuts, tag touch, or loud sounds', score: 2 },
      { text: 'Actively seeks intense sensory input (spinning, tapping items near ears, smelling objects)', score: 2 }
    ]
  },
  {
    id: 'q6',
    category: 'Daily Activities',
    question: 'How does your child handle changes in daily routine or transitions between activities?',
    description: 'Transitions include stopping play to eat dinner, taking a different path home, or changing clothes.',
    options: [
      { text: 'Adapts smoothly to routine changes with simple verbal reminders', score: 0 },
      { text: 'Needs visual cues or timer countdowns to transition without minor fussing', score: 1 },
      { text: 'Experiences severe distress or meltdowns when familiar routines alter unexpected', score: 2 },
      { text: 'Insists on rigid order of objects (arranging shoes, lining up toys in exact sequence)', score: 2 }
    ]
  }
];
