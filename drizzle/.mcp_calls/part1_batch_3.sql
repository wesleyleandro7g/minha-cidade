AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
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
  'studio-bella-beleza',
  'Studio Bella',
  'servico'::business_type,
  tc.db_id,
  tn.db_id,
  'Salão de beleza completo: cabelo, unhas, design de sobrancelhas, maquiagem e dia da noiva. Profissionais premiados e ambiente acolhedor.',
  'Salão completo de beleza e estética.',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80',
  '5538999990004',
  '3899990004',
  'studiobellasalinas',
  NULL,
  'Rua das Flores, 210 - Vila Amazonas',
  -16.169,
  -42.288,
  'published'::entity_status,
  true,
  'premium'::plan_tier,
  2,
  4.9,
  203,
  '["cabelo","unhas","sobrancelha","noiva"]',
  '["https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-beleza' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-vila-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-studio-bella', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'studio-bella-beleza';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '08:00', '20:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '08:00', '20:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '08:00', '20:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '08:00', '20:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '08:00', '20:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE bh.weekday = 5
);

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

COMMIT;

