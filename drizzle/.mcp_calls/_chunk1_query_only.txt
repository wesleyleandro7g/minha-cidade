INSERT INTO public._seed_migration_staging (part, content) VALUES (1, $c1$-- Seed demo data from fixtures
BEGIN;

CREATE TEMP TABLE _seed_ids (
  fixture_id text PRIMARY KEY,
  entity_type text NOT NULL,
  db_id uuid NOT NULL
);

-- Plans
INSERT INTO plans (tier, name, price_monthly, features)
SELECT * FROM (VALUES
  ('free'::plan_tier, 'Gratuito', 0::numeric, '["Perfil básico"]'::jsonb),
  ('premium'::plan_tier, 'Premium', 49.90::numeric, '["Mais fotos", "Promoções", "Destaque nas buscas"]'::jsonb),
  ('gold'::plan_tier, 'Ouro', 99.90::numeric, '["Banner na home", "Dashboard avançado", "Prioridade em resultados"]'::jsonb)
) AS v(tier, name, price_monthly, features)
WHERE NOT EXISTS (SELECT 1 FROM plans p WHERE p.tier = v.tier);

INSERT INTO categories (slug, name, icon) VALUES ('restaurantes', 'Restaurantes', 'utensils') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-restaurantes', 'category', id FROM categories WHERE slug = 'restaurantes';

INSERT INTO categories (slug, name, icon) VALUES ('saude', 'Saúde', 'heart-pulse') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-saude', 'category', id FROM categories WHERE slug = 'saude';

INSERT INTO categories (slug, name, icon) VALUES ('beleza', 'Beleza', 'scissors') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-beleza', 'category', id FROM categories WHERE slug = 'beleza';

INSERT INTO categories (slug, name, icon) VALUES ('servicos', 'Serviços', 'wrench') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-servicos', 'category', id FROM categories WHERE slug = 'servicos';

INSERT INTO categories (slug, name, icon) VALUES ('lojas', 'Lojas', 'shopping-bag') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-lojas', 'category', id FROM categories WHERE slug = 'lojas';

INSERT INTO categories (slug, name, icon) VALUES ('hoteis', 'Hotéis', 'bed-double') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-hoteis', 'category', id FROM categories WHERE slug = 'hoteis';

INSERT INTO categories (slug, name, icon) VALUES ('turismo', 'Turismo', 'map-pin') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-turismo', 'category', id FROM categories WHERE slug = 'turismo';

INSERT INTO categories (slug, name, icon) VALUES ('educacao', 'Educação', 'graduation-cap') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-educacao', 'category', id FROM categories WHERE slug = 'educacao';

INSERT INTO categories (slug, name, icon) VALUES ('automotivo', 'Automotivo', 'car') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-automotivo', 'category', id FROM categories WHERE slug = 'automotivo';

INSERT INTO categories (slug, name, icon) VALUES ('pets', 'Pets', 'paw-print') ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 'c-pets', 'category', id FROM categories WHERE slug = 'pets';

INSERT INTO tenants (slug, name, state, logo_url, banner_url, theme, status, lat, lng)
VALUES ('salinas', 'Salinas', 'MG', NULL, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80', '{"primary":"#FF6B00"}', 'published'::entity_status, -16.1716, -42.2917)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 't-salinas', 'tenant', id FROM tenants WHERE slug = 'salinas';

INSERT INTO tenants (slug, name, state, logo_url, banner_url, theme, status, lat, lng)
VALUES ('montes-claros', 'Montes Claros', 'MG', NULL, 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80', '{"primary":"#FF6B00"}', 'published'::entity_status, -16.7282, -43.8578)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id) SELECT 't-montes-claros', 'tenant', id FROM tenants WHERE slug = 'montes-claros';

INSERT INTO neighborhoods (tenant_id, name, slug)
SELECT t.db_id, 'Centro', 'centro'
FROM _seed_ids t WHERE t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'n-centro-sal', 'neighborhood', nb.id
FROM neighborhoods nb
JOIN _seed_ids t ON t.db_id = nb.tenant_id AND t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
WHERE nb.slug = 'centro';

INSERT INTO neighborhoods (tenant_id, name, slug)
SELECT t.db_id, 'Vila Amazonas', 'vila-amazonas'
FROM _seed_ids t WHERE t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'n-vila-sal', 'neighborhood', nb.id
FROM neighborhoods nb
JOIN _seed_ids t ON t.db_id = nb.tenant_id AND t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
WHERE nb.slug = 'vila-amazonas';

INSERT INTO neighborhoods (tenant_id, name, slug)
SELECT t.db_id, 'Aterrado', 'aterrado'
FROM _seed_ids t WHERE t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'n-aterrado-sal', 'neighborhood', nb.id
FROM neighborhoods nb
JOIN _seed_ids t ON t.db_id = nb.tenant_id AND t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
WHERE nb.slug = 'aterrado';

INSERT INTO neighborhoods (tenant_id, name, slug)
SELECT t.db_id, 'Fátima', 'fatima'
FROM _seed_ids t WHERE t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'n-fatima-sal', 'neighborhood', nb.id
FROM neighborhoods nb
JOIN _seed_ids t ON t.db_id = nb.tenant_id AND t.fixture_id = 't-salinas' AND t.entity_type = 'tenant'
WHERE nb.slug = 'fatima';

INSERT INTO neighborhoods (tenant_id, name, slug)
SELECT t.db_id, 'Centro', 'centro'
FROM _seed_ids t WHERE t.fixture_id = 't-montes-claros' AND t.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'n-centro-mc', 'neighborhood', nb.id
FROM neighborhoods nb
JOIN _seed_ids t ON t.db_id = nb.tenant_id AND t.fixture_id = 't-montes-claros' AND t.entity_type = 'tenant'
WHERE nb.slug = 'centro';

INSERT INTO neighborhoods (tenant_id, name, slug)
SELECT t.db_id, 'Ibituruna', 'ibituruna'
FROM _seed_ids t WHERE t.fixture_id = 't-montes-claros' AND t.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'n-ibituruna-mc', 'neighborhood', nb.id
FROM neighborhoods nb
JOIN _seed_ids t ON t.db_id = nb.tenant_id AND t.fixture_id = 't-montes-claros' AND t.entity_type = 'tenant'
WHERE nb.slug = 'ibituruna';

INSERT INTO businesses (
  tenant_id, slug, name, type, category_id, neighborhood_id,
  description, short_description, logo_url, cover_url,
  whatsapp, phone, instagram, website, address, lat, lng,
  status, is_featured, plan_tier, price_level, rating_avg, rating_count, tags, gallery
)
SELECT
  tt.db_id,
  'cachacaria-do-vale',
  'Cachaçaria do Vale',
  'loja'::business_type,
  tc.db_id,
  tn.db_id,
  'A maior seleção de cachaças artesanais de Salinas, capital nacional da cachaça. Degustação guiada, rótulos premiados e visitas ao alambique.',
  'Cachaças artesanais premiadas e degustação guiada.',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1400&q=80',
  '5538999990001',
  '3899990001',
  'cachacariadovale',
  'https://cachacariadovale.com.br',
  'Rua das Cachaças, 120 - Centro',
  -16.1721,
  -42.2901,
  'published'::entity_status,
  true,
  'gold'::plan_tier,
  2,
  4.9,
  312,
  '["cachaça","artesanal","degustação","presentes"]',
  '["https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-lojas' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-centro-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-cachacaria', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'cachacaria-do-vale';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '09:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '09:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '09:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '09:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb$c1$) ON CONFLICT (part) DO UPDATE SET content = EXCLUDED.content;