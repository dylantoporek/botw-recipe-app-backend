-- Postgres schema for the BOTW cooking app (port of the Rails schema.rb)

CREATE TABLE IF NOT EXISTS users (
  id bigserial PRIMARY KEY,
  username varchar UNIQUE NOT NULL,
  password_digest varchar NOT NULL,
  bank integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kitchens (
  id bigserial PRIMARY KEY,
  user_id bigint NOT NULL REFERENCES users (id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS index_kitchens_on_user_id ON kitchens (user_id);

CREATE TABLE IF NOT EXISTS ingredients (
  id bigserial PRIMARY KEY,
  name varchar,
  description text,
  price integer,
  image varchar,
  category varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS recipes (
  id bigserial PRIMARY KEY,
  name varchar,
  category varchar,
  price integer,
  description text,
  image varchar,
  ingredient1 varchar,
  ingredient2 varchar,
  ingredient3 varchar,
  ingredient4 varchar,
  ingredient5 varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stores (
  id bigserial PRIMARY KEY,
  name varchar,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pantries (
  id bigserial PRIMARY KEY,
  kitchen_id bigint NOT NULL REFERENCES kitchens (id),
  ingredient_id bigint NOT NULL REFERENCES ingredients (id),
  quantity integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS index_pantries_on_kitchen_id ON pantries (kitchen_id);
CREATE INDEX IF NOT EXISTS index_pantries_on_ingredient_id ON pantries (ingredient_id);

CREATE TABLE IF NOT EXISTS dishes (
  id bigserial PRIMARY KEY,
  kitchen_id bigint NOT NULL REFERENCES kitchens (id),
  recipe_id bigint NOT NULL REFERENCES recipes (id),
  quantity integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS index_dishes_on_kitchen_id ON dishes (kitchen_id);
CREATE INDEX IF NOT EXISTS index_dishes_on_recipe_id ON dishes (recipe_id);
