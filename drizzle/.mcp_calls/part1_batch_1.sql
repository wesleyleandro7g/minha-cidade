-- Continue seed (slug-based mapping via temp table rebuilt from existing rows)
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
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '09:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '09:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-cachacaria'
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
  'restaurante-sabor-mineiro',
  'Restaurante Sabor Mineiro',
