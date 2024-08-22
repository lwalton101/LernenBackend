CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  account_creation_date TIMESTAMP,
  profile_pic VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS questions (
  question_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  user_id INT,
  created_at TIMESTAMP,
  published BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS subquestions (
  subquestion_id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT,
  type INT,
  question_num INT,
  text TEXT,
  audio_file_path VARCHAR(255),
  option1 VARCHAR(255),
  option2 VARCHAR(255),
  option3 VARCHAR(255),
  option4 VARCHAR(255),
  answer1 BOOLEAN,
  answer2 BOOLEAN,
  answer3 BOOLEAN,
  answer4 BOOLEAN,
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id INT PRIMARY KEY AUTO_INCREMENT,
  tag_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS questiontags (
  question_tag_id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT,
  tag_id INT,
  FOREIGN KEY (question_id) REFERENCES questions(question_id),
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);