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

INSERT INTO businesses (
  tenant_id, slug, name, type, category_id, neighborhood_id,
  description, short_description, logo_url, cover_url,
  whatsapp, phone, instagram, website, address, lat, lng,
  status, is_featured, plan_tier, price_level, rating_avg, rating_count, tags, gallery
)
SELECT
  tt.db_id,
  'academia-energia',
  'Academia Energia',
  'servico'::business_type,
  tc.db_id,
  tn.db_id,
  'Musculação, crossfit, lutas e aulas coletivas com avaliação física gratuita. Estrutura completa e equipe especializada.',
  'Musculação, crossfit e aulas coletivas.',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80',
  '5538988880002',
  '3838880002',
  'academiaenergiamc',
  NULL,
  'Rua Coronel Spyer, 300 - Centro',
  -16.726,
  -43.866,
  'published'::entity_status,
  false,
  'premium'::plan_tier,
  2,
  4.6,
  189,
  '["academia","crossfit","musculação"]',
  '["https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-saude' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-centro-mc' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-mc-academia', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'academia-energia';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '05:30', '22:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '05:30', '22:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '05:30', '22:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '05:30', '22:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '05:30', '22:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '05:30', '22:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-academia' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-academia'
  WHERE bh.weekday = 6
);

INSERT INTO products (tenant_id, business_id, name, description, price, image_url)
SELECT tt.db_id, tb.db_id, 'Cachaça Ouro Premium 700ml', 'Envelhecida 3 anos em bálsamo.', 89.9, 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM products pr
  JOIN _seed_ids tb2 ON tb2.db_id = pr.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE pr.name = 'Cachaça Ouro Premium 700ml'
);

INSERT INTO products (tenant_id, business_id, name, description, price, image_url)
SELECT tt.db_id, tb.db_id, 'Kit Degustação 5 Rótulos', 'Miniaturas das premiadas da casa.', 129.9, 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=600&q=80'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM products pr
  JOIN _seed_ids tb2 ON tb2.db_id = pr.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE pr.name = 'Kit Degustação 5 Rótulos'
);

INSERT INTO products (tenant_id, business_id, name, description, price, image_url)
SELECT tt.db_id, tb.db_id, 'Feijoada Completa (2 pessoas)', 'Acompanha arroz, couve, torresmo e laranja.', 79.9, 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM products pr
  JOIN _seed_ids tb2 ON tb2.db_id = pr.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE pr.name = 'Feijoada Completa (2 pessoas)'
);

COMMIT;
