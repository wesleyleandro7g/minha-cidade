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
SELECT tt.db_id, tb.db_id, 6, '08:00', '20:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
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
  'pizzaria-forno-de-pedra',
  'Pizzaria Forno de Pedra',
  'restaurante'::business_type,
  tc.db_id,
  tn.db_id,
  'Pizzas artesanais em forno a lenha, massa de fermentação natural e ingredientes frescos. Delivery rápido e ambiente família.',
  'Pizza artesanal em forno a lenha.',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80',
  '5538999990005',
  '3899990005',
  'fornodepedrasalinas',
  NULL,
  'Av. Brasil, 980 - Aterrado',
  -16.1668,
  -42.295,
  'published'::entity_status,
  false,
  'free'::plan_tier,
  2,
  4.6,
  378,
  '["pizza","delivery","forno a lenha"]',
  '["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-restaurantes' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-aterrado-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-pizzaria-forno', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'pizzaria-forno-de-pedra';

INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT CASE bs.slug
  WHEN 'cachacaria-do-vale' THEN 'b-cachacaria'
  WHEN 'restaurante-sabor-mineiro' THEN 'b-sabor-mineiro'
  WHEN 'clinica-vida-saude' THEN 'b-clinica-vida'
  WHEN 'studio-bella-beleza' THEN 'b-studio-bella'
  WHEN 'pizzaria-forno-de-pedra' THEN 'b-pizzaria-forno'
  WHEN 'hotel-serra-azul' THEN 'b-hotel-serra'
  WHEN 'auto-center-salinas' THEN 'b-auto-center'
  WHEN 'pet-amigo' THEN 'b-pet-amigo'
  WHEN 'bistro-ibituruna' THEN 'b-mc-bistro'
  WHEN 'academia-energia' THEN 'b-mc-academia'
END, 'business', bs.id
FROM businesses bs
JOIN tenants t ON t.id = bs.tenant_id
WHERE bs.slug IN ('cachacaria-do-vale','restaurante-sabor-mineiro','clinica-vida-saude','studio-bella-beleza','pizzaria-forno-de-pedra','hotel-serra-azul','auto-center-salinas','pet-amigo','bistro-ibituruna','academia-energia');

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, '18:00', '23:30', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '18:00', '23:30', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '18:00', '23:30', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '18:00', '23:30', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE bh.weekday = 4
);

COMMIT;
