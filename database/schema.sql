-- ============================================================
-- AUTISM CONNECT INDIA - COMPLETE DATABASE SCHEMA
-- MySQL 8.0+
-- ============================================================

DROP DATABASE IF EXISTS autism_connect_india;
CREATE DATABASE autism_connect_india CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE autism_connect_india;

-- ============================================================
-- 1. USERS  (base table for all logins: PARENT, ADMIN, CONSULTANT, DONOR)
-- ============================================================
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('PARENT','ADMIN','CONSULTANT','DONOR') NOT NULL,
    preferred_language ENUM('en','hi','mr','kn') DEFAULT 'en',
    profile_image VARCHAR(255) DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(255) DEFAULT NULL,
    reset_token_expiry DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB;

-- ============================================================
-- 2. PARENTS (1-1 extension of users)
-- ============================================================
CREATE TABLE parents (
    parent_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_parents_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 3. CONSULTANTS (1-1 extension of users)
-- ============================================================
CREATE TABLE consultants (
    consultant_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    qualification VARCHAR(200),
    experience_years INT DEFAULT 0,
    specialization VARCHAR(200),
    languages_spoken VARCHAR(200),
    bio TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    available_days VARCHAR(100),
    available_time_start TIME,
    available_time_end TIME,
    consultation_fee DECIMAL(10,2) DEFAULT 0.00,
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_consultants_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 4. CHILDREN
-- ============================================================
CREATE TABLE children (
    child_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT NOT NULL,
    name VARCHAR(120) NOT NULL,
    age INT NOT NULL,
    gender ENUM('MALE','FEMALE','OTHER') NOT NULL,
    autism_level ENUM('LEVEL_1','LEVEL_2','LEVEL_3') NOT NULL,
    interests VARCHAR(255),
    communication_skills VARCHAR(255),
    behavior_notes TEXT,
    therapist_notes TEXT,
    medical_notes TEXT,
    favorite_activities VARCHAR(255),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_children_parent FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE,
    INDEX idx_children_parent (parent_id)
) ENGINE=InnoDB;

-- ============================================================
-- 5. ACTIVITIES
-- ============================================================
CREATE TABLE activities (
    activity_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    difficulty ENUM('EASY','MEDIUM','HARD') DEFAULT 'EASY',
    duration_minutes INT,
    age_group VARCHAR(50),
    materials_needed VARCHAR(255),
    benefits TEXT,
    instructions TEXT,
    youtube_link VARCHAR(255),
    instagram_link VARCHAR(255),
    category ENUM('COMMUNICATION','SOCIAL_SKILLS','MOTOR_SKILLS','LEARNING','SENSORY',
                   'SPEECH','CREATIVITY','MEMORY','SORTING','MATCHING','INDOOR','OUTDOOR') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_activities_category (category)
) ENGINE=InnoDB;

-- ============================================================
-- 6. COMPLETED / FAVORITE ACTIVITIES (per child)
-- ============================================================
CREATE TABLE completed_activities (
    completed_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    child_id BIGINT NOT NULL,
    activity_id BIGINT NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_date DATETIME DEFAULT NULL,
    progress_percent INT DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ca_child FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE CASCADE,
    CONSTRAINT fk_ca_activity FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
    UNIQUE KEY uq_child_activity (child_id, activity_id)
) ENGINE=InnoDB;

-- ============================================================
-- 7. APPOINTMENTS
-- ============================================================
CREATE TABLE appointments (
    appointment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT NOT NULL,
    child_id BIGINT,
    consultant_id BIGINT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('PENDING','CONFIRMED','COMPLETED','CANCELLED') DEFAULT 'PENDING',
    reason VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_appt_parent FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE,
    CONSTRAINT fk_appt_child FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE SET NULL,
    CONSTRAINT fk_appt_consultant FOREIGN KEY (consultant_id) REFERENCES consultants(consultant_id) ON DELETE CASCADE,
    INDEX idx_appt_date (appointment_date)
) ENGINE=InnoDB;

-- ============================================================
-- 8. DONATIONS
-- ============================================================
CREATE TABLE donations (
    donation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    donor_id BIGINT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    purpose VARCHAR(255),
    message TEXT,
    payment_status ENUM('PENDING','SUCCESS','FAILED') DEFAULT 'PENDING',
    transaction_ref VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_donations_user FOREIGN KEY (donor_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- 9. PUZZLES (games catalogue)
-- ============================================================
CREATE TABLE puzzles (
    puzzle_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type ENUM('MEMORY_MATCH','COLOR_MATCH','SHAPE_MATCH','ALPHABET_PUZZLE','ANIMAL_PUZZLE',
              'FRUIT_PUZZLE','OBJECT_MATCHING','DRAG_AND_DROP','LETTER_IDENTIFICATION','NUMBER_PUZZLE') NOT NULL,
    difficulty ENUM('EASY','MEDIUM','HARD') DEFAULT 'EASY',
    thumbnail_url VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 10. SCORES (child puzzle attempts)
-- ============================================================
CREATE TABLE scores (
    score_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    child_id BIGINT NOT NULL,
    puzzle_id BIGINT NOT NULL,
    score INT DEFAULT 0,
    stars INT DEFAULT 0,
    badge VARCHAR(50),
    time_taken_seconds INT,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_scores_child FOREIGN KEY (child_id) REFERENCES children(child_id) ON DELETE CASCADE,
    CONSTRAINT fk_scores_puzzle FOREIGN KEY (puzzle_id) REFERENCES puzzles(puzzle_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 11. NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
    notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 12. BLOGS
-- ============================================================
CREATE TABLE blogs (
    blog_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    author_id BIGINT,
    title VARCHAR(200) NOT NULL,
    content LONGTEXT NOT NULL,
    cover_image VARCHAR(255),
    tags VARCHAR(255),
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_blogs_author FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- 13. FEEDBACK
-- ============================================================
CREATE TABLE feedback (
    feedback_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- 14. CONTACTS (contact-us form submissions)
-- ============================================================
CREATE TABLE contacts (
    contact_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- SAMPLE / SEED DATA
-- ============================================================

INSERT INTO users (full_name, email, password_hash, phone, role, preferred_language) VALUES
('System Admin', 'admin@autismconnect.in', '$2a$10$examplehashadmin000000000000000000000000000000000000', '9999900000', 'ADMIN', 'en'),
('Priya Sharma', 'priya.sharma@example.com', '$2a$10$examplehashparent0000000000000000000000000000000000', '9876543210', 'PARENT', 'hi'),
('Dr. Anjali Deshmukh', 'anjali.deshmukh@example.com', '$2a$10$examplehashconsult000000000000000000000000000000000', '9823456780', 'CONSULTANT', 'mr'),
('Ramesh Gowda', 'ramesh.gowda@example.com', '$2a$10$examplehashdonor00000000000000000000000000000000000', '9845123456', 'DONOR', 'kn');

INSERT INTO parents (user_id, address, city, state, pincode, emergency_contact) VALUES
(2, '12 MG Road', 'Pune', 'Maharashtra', '411001', '9876500000');

INSERT INTO consultants (user_id, qualification, experience_years, specialization, languages_spoken, bio, rating, available_days, available_time_start, available_time_end, consultation_fee) VALUES
(3, 'MSc Clinical Psychology, RCI Licensed', 8, 'Behavioral Therapy, Speech Delay', 'English, Hindi, Marathi',
 'Dr. Deshmukh has 8 years of experience working with autistic children on communication and behavioral skills.',
 4.8, 'Mon-Fri', '10:00:00', '17:00:00', 500.00);

INSERT INTO children (parent_id, name, age, gender, autism_level, interests, communication_skills, favorite_activities) VALUES
(1, 'Aarav Sharma', 6, 'MALE', 'LEVEL_1', 'Cars, Puzzles, Music', 'Uses short phrases, improving eye contact', 'Shape Matching, Color Match');

INSERT INTO activities (title, description, image_url, difficulty, duration_minutes, age_group, materials_needed, benefits, instructions, youtube_link, instagram_link, category) VALUES
('Color Sorting Basket', 'Sort colored balls into matching baskets to build visual discrimination.', 'https://picsum.photos/seed/color-sorting/400/300', 'EASY', 15, '3-6 years', 'Colored balls, baskets', 'Improves color recognition and fine motor skills', 'Place baskets in front of the child and ask them to sort balls by color.', 'https://www.youtube.com/results?search_query=autism+color+sorting+activity', 'https://www.instagram.com/explore/tags/autismactivities/', 'SORTING'),
('Mirror Me', 'Parent performs an action and child imitates it, building social mirroring skills.', 'https://picsum.photos/seed/mirror-me/400/300', 'EASY', 10, '4-8 years', 'None', 'Builds imitation and social engagement', 'Sit facing the child, perform simple gestures, encourage imitation.', 'https://www.youtube.com/results?search_query=autism+mirror+me+activity', 'https://www.instagram.com/explore/tags/autismawareness/', 'SOCIAL_SKILLS'),
('Sound Match Cards', 'Match animal sound cards to pictures to build auditory-visual association.', 'https://picsum.photos/seed/sound-match/400/300', 'MEDIUM', 20, '5-9 years', 'Animal sound cards, tablet/speaker', 'Improves auditory processing and vocabulary', 'Play a sound, ask the child to pick the matching animal card.', 'https://www.youtube.com/results?search_query=autism+sound+matching+cards', 'https://www.instagram.com/explore/tags/speechtherapy/', 'MATCHING'),
('Sensory Bin Exploration', 'Guided play in a rice/bean sensory bin to build tactile tolerance.', 'https://picsum.photos/seed/sensory-bin/400/300', 'EASY', 15, '3-7 years', 'Rice or beans, small toys, a bin', 'Builds sensory tolerance and fine motor skills', 'Hide small toys in the bin and let the child search with their hands.', 'https://www.youtube.com/results?search_query=autism+sensory+bin+activity', 'https://www.instagram.com/explore/tags/sensoryplay/', 'SENSORY'),
('Feelings Flashcards', 'Show flashcards of facial expressions and name the emotion together.', 'https://picsum.photos/seed/feelings-cards/400/300', 'EASY', 10, '4-8 years', 'Emotion flashcards', 'Builds emotional vocabulary and communication', 'Hold up a card, name the emotion, ask the child to mimic the expression.', 'https://www.youtube.com/results?search_query=autism+feelings+flashcards', 'https://www.instagram.com/explore/tags/emotionalregulation/', 'COMMUNICATION'),
('Memory Match Game', 'Flip cards to find matching pairs, building memory and visual recall.', 'https://picsum.photos/seed/memory-match/400/300', 'MEDIUM', 15, '5-10 years', 'Memory match cards', 'Builds memory, focus, and pattern recognition', 'Lay cards face down, take turns flipping two at a time to find pairs.', 'https://www.youtube.com/results?search_query=autism+memory+match+game', 'https://www.instagram.com/explore/tags/memorygame/', 'MEMORY'),
('Shape Puzzle Board', 'Fit wooden shapes into their matching cutouts on a board.', 'https://picsum.photos/seed/shape-puzzle/400/300', 'EASY', 12, '3-6 years', 'Wooden shape puzzle board', 'Builds fine motor skills and shape recognition', 'Remove the shapes, mix them up, and guide the child to place each back.', 'https://www.youtube.com/results?search_query=autism+shape+puzzle+game', 'https://www.instagram.com/explore/tags/shapesorting/', 'MOTOR_SKILLS');

INSERT INTO puzzles (name, type, difficulty, thumbnail_url, description) VALUES
('Farm Animal Memory', 'MEMORY_MATCH', 'EASY', '/assets/puzzles/farm-memory.png', 'Flip cards to find matching farm animal pairs.'),
('Rainbow Colors', 'COLOR_MATCH', 'EASY', '/assets/puzzles/rainbow.png', 'Match objects to their correct colors.'),
('ABC Puzzle', 'ALPHABET_PUZZLE', 'MEDIUM', '/assets/puzzles/abc.png', 'Drag letters into the correct alphabet slot.');

INSERT INTO scores (child_id, puzzle_id, score, stars, badge, time_taken_seconds) VALUES
(1, 1, 85, 3, 'Fast Learner', 95);

INSERT INTO blogs (author_id, title, content, cover_image, tags) VALUES
(1, 'Understanding Autism Spectrum Disorder', 'Autism Spectrum Disorder (ASD) is a developmental condition that affects communication and behavior...', '/assets/blogs/understanding-asd.jpg', 'autism,awareness,parenting');
