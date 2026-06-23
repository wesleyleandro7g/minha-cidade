-- standalone seed batch
BEGIN;
CREATE TEMP TABLE _seed_ids (
  fixture_id text PRIMARY KEY,
  entity_type text NOT NULL,
  db_id uuid NOT NULL
);
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'c-' || slug, 'category', id FROM categories;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT CASE slug WHEN 'salinas' THEN 't-salinas' WHEN 'montes-claros' THEN 't-montes-claros' END, 'tenant', id
FROM tenants WHERE slug IN ('salinas','montes-claros');
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT CASE nb.slug
  WHEN 'centro' THEN CASE t.slug WHEN 'salinas' THEN 'n-centro-sal' WHEN 'montes-claros' THEN 'n-centro-mc' END
  WHEN 'vila-amazonas' THEN 'n-vila-sal'
  WHEN 'aterrado' THEN 'n-aterrado-sal'
  WHEN 'fatima' THEN 'n-fatima-sal'
  WHEN 'ibituruna' THEN 'n-ibituruna-mc'
END, 'neighborhood', nb.id
FROM neighborhoods nb
JOIN tenants t ON t.id = nb.tenant_id
WHERE t.slug IN ('salinas','montes-claros');

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '18:00', '23:30', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '18:00', '23:30', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 6
);

INSERT INTO businesses (
  tenant_id, slug, name, type, category_id, neighborhood_id,
  description, short_description, logo_url, cover_url,
  whatsapp, phone, instagram, website, address, lat, lng,
  status, is_featured, plan_tier, price_level, rating_avg, rating_count, tags, gallery
)
SELECT
  tt.db_id,
  'hotel-serra-azul',
  'Hotel Serra Azul',
  'hotel'::business_type,
  tc.db_id,
  tn.db_id,
  'Hotel com piscina, café da manhã regional incluso, Wi-Fi rápido e estacionamento gratuito. A poucos passos do centro histórico.',
  'Conforto no centro, com piscina e café regional.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80',
  '5538999990006',
  '3899990006',
  'hotelserrazul',
  'https://hotelserraazul.com.br',
  'Rua do Comércio, 33 - Centro',
  -16.1718,
  -42.2912,
  'published'::entity_status,
  true,
  'gold'::plan_tier,
  3,
  4.5,
  521,
  '["hospedagem","piscina","café da manhã","wifi"]',
  '["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-hoteis' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-centro-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-hotel-serra', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'hotel-serra-azul';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '00:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-hotel-serra'
  WHERE bh.weekday = 6
);

INSERT INTO businesses (
  tenant_id, slug, name, type, category_id, neighborhood_id,
  description, short_description, logo_url, cover_url,
  whatsapp, phone, instagram, website, address, lat, lng,
  status, is_featured, plan_tier, price_level, rating_avg, rating_count, tags, gallery
)
SELECT
  tt.db_id,
  'auto-center-salinas',
  'Auto Center Salinas',
  'servico'::business_type,
  tc.db_id,
  tn.db_id,
  'Mecânica geral, troca de óleo, alinhamento, balanceamento e loja de peças. Orçamento sem compromisso e garantia em todos os serviços.',
  'Mecânica completa e loja de peças.',
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1400&q=80',
  '5538999990007',
  '3899990007',
  NULL,
  NULL,
  'Av. das Indústrias, 1500 - Aterrado',
  -16.165,
  -42.297,
  'published'::entity_status,
  false,
  'free'::plan_tier,
  2,
  4.4,
  98,
  '["mecânica","peças","óleo","alinhamento"]',
  '["https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-automotivo' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-aterrado-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

COMMIT;
