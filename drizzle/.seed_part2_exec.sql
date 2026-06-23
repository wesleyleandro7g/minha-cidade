-- Continue seed part 2 (standalone)
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
WHERE (t.slug, nb.slug) IN (('salinas','centro'),('salinas','vila-amazonas'),('salinas','aterrado'),('salinas','fatima'),('montes-claros','centro'),('montes-claros','ibituruna'));

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
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-auto-center', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'auto-center-salinas';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-auto-center' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-auto-center'
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
  'pet-amigo',
  'Pet Amigo',
  'loja'::business_type,
  tc.db_id,
  tn.db_id,
  'Pet shop com banho e tosa, veterinário, rações e acessórios. Leva e traz gratuito no centro e agendamento pelo WhatsApp.',
  'Banho, tosa, veterinário e rações.',
  'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1400&q=80',
  '5538999990008',
  '3899990008',
  'petamigosalinas',
  NULL,
  'Rua dos Ipês, 45 - Vila Amazonas',
  -16.1685,
  -42.2872,
  'published'::entity_status,
  false,
  'premium'::plan_tier,
  2,
  4.8,
  142,
  '["pet","banho e tosa","veterinário","ração"]',
  '["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-pets' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-vila-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-pet-amigo', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'pet-amigo';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '08:00', '18:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pet-amigo' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-pet-amigo'
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
  'bistro-ibituruna',
  'Bistrô Ibituruna',
  'restaurante'::business_type,
  tc.db_id,
  tn.db_id,
  'Cozinha contemporânea com ingredientes do sertão mineiro, carta de vinhos e vista para o Pico do Ibituruna.',
  'Cozinha contemporânea com vista para o Pico.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
  '5538988880001',
  '3838880001',
  'bistroibituruna',
  NULL,
  'Av. Ibituruna, 2000 - Ibituruna',
  -16.73,
  -43.86,
  'published'::entity_status,
  true,
  'gold'::plan_tier,
  3,
  4.8,
  267,
  '["bistrô","vinhos","contemporânea"]',
  '["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-restaurantes' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-ibituruna-mc' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-mc-bistro', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'bistro-ibituruna';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, '18:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '18:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '18:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '18:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '18:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '18:00', '23:59', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-mc-bistro'
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

INSERT INTO products (tenant_id, business_id, name, description, price, image_url)
SELECT tt.db_id, tb.db_id, 'Pizza Grande Calabresa', 'Massa natural, mussarela e calabresa artesanal.', 54.9, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM products pr
  JOIN _seed_ids tb2 ON tb2.db_id = pr.business_id AND tb2.fixture_id = 'b-pizzaria-forno'
  WHERE pr.name = 'Pizza Grande Calabresa'
);

INSERT INTO promotions (
  tenant_id, business_id, title, description, banner_url, discount_label,
  starts_at, ends_at, rules, coupon_code
)
SELECT tt.db_id, tb.db_id,
  'Feijoada em dobro aos sábados', 'Peça uma feijoada e a segunda sai pela metade do preço.', 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1200&q=80', '50% OFF',
  NOW() - INTERVAL '2 days',
  NOW() + INTERVAL '20 days',
  'Válido somente aos sábados, no almoço. Não cumulativo.', 'FEIJOADA50'
FROM _seed_ids tt
JOIN _seed_ids tb ON tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
AND NOT EXISTS (
  SELECT 1 FROM promotions pr WHERE pr.coupon_code = 'FEIJOADA50' AND pr.tenant_id = tt.db_id
);

INSERT INTO promotions (
  tenant_id, business_id, title, description, banner_url, discount_label,
  starts_at, ends_at, rules, coupon_code
)
SELECT tt.db_id, tb.db_id,
  'Combo Beleza: corte + escova', 'Pacote especial de corte feminino com escova modeladora.', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80', '30% OFF',
  NOW() - INTERVAL '1 days',
  NOW() + INTERVAL '15 days',
  'Mediante agendamento. Segunda a quinta.', 'BELLA30'
FROM _seed_ids tt
JOIN _seed_ids tb ON tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
AND NOT EXISTS (
  SELECT 1 FROM promotions pr WHERE pr.coupon_code = 'BELLA30' AND pr.tenant_id = tt.db_id
);

INSERT INTO promotions (
  tenant_id, business_id, title, description, banner_url, discount_label,
  starts_at, ends_at, rules, coupon_code
)
SELECT tt.db_id, tb.db_id,
  'Pizza grande + refri por R$ 59', 'Qualquer pizza grande tradicional com refrigerante 2L.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80', 'COMBO',
  NOW() + INTERVAL '0 days',
  NOW() + INTERVAL '10 days',
  'Válido no delivery e balcão.', 'PIZZA59'
FROM _seed_ids tt
JOIN _seed_ids tb ON tb.fixture_id = 'b-pizzaria-forno' AND tb.entity_type = 'business'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
AND NOT EXISTS (
  SELECT 1 FROM promotions pr WHERE pr.coupon_code = 'PIZZA59' AND pr.tenant_id = tt.db_id
);

INSERT INTO promotions (
  tenant_id, business_id, title, description, banner_url, discount_label,
  starts_at, ends_at, rules, coupon_code
)
SELECT tt.db_id, tb.db_id,
  '2 diárias com 1 grátis', 'Reserve 2 noites e ganhe a terceira cortesia.', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80', '3x2',
  NOW() + INTERVAL '0 days',
  NOW() + INTERVAL '40 days',
  'Sujeito à disponibilidade. Não vale em feriados.', 'SERRA3X2'
FROM _seed_ids tt
JOIN _seed_ids tb ON tb.fixture_id = 'b-hotel-serra' AND tb.entity_type = 'business'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
AND NOT EXISTS (
  SELECT 1 FROM promotions pr WHERE pr.coupon_code = 'SERRA3X2' AND pr.tenant_id = tt.db_id
);

INSERT INTO promotions (
  tenant_id, business_id, title, description, banner_url, discount_label,
  starts_at, ends_at, rules, coupon_code
)
SELECT tt.db_id, tb.db_id,
  'Harmonização com vinho cortesia', 'No menu degustação, a primeira taça é por nossa conta.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80', 'BRINDE',
  NOW() + INTERVAL '0 days',
  NOW() + INTERVAL '25 days',
  'Maiores de 18 anos.', 'BISTRO1'
FROM _seed_ids tt
JOIN _seed_ids tb ON tb.fixture_id = 'b-mc-bistro' AND tb.entity_type = 'business'
WHERE tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
AND NOT EXISTS (
  SELECT 1 FROM promotions pr WHERE pr.coupon_code = 'BISTRO1' AND pr.tenant_id = tt.db_id
);

INSERT INTO events (
  tenant_id, business_id, slug, name, description, banner_url,
  starts_at, ends_at, venue, address, lat, lng, is_free, ticket_from
)
SELECT tt.db_id, NULL,
  'festival-da-cachaca', 'Festival Mundial da Cachaça', 'O maior festival de cachaça do Brasil reúne alambiques, shows, gastronomia e turismo no coração de Salinas.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
  NOW() + INTERVAL '12 days',
  NOW() + INTERVAL '15 days',
  'Parque de Exposições', 'Av. Tancredo Neves, s/n - Salinas/MG', -16.17, -42.293, true,
  0
FROM _seed_ids tt

WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO events (
  tenant_id, business_id, slug, name, description, banner_url,
  starts_at, ends_at, venue, address, lat, lng, is_free, ticket_from
)
SELECT tt.db_id, tb.db_id,
  'noite-da-viola', 'Noite da Viola Mineira', 'Música raiz ao vivo com o melhor da culinária mineira.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
  NOW() + INTERVAL '5 days',
  NULL,
  'Restaurante Sabor Mineiro', 'Av. Tancredo Neves, 540 - Centro', -16.1709, -42.2925, false,
  25
FROM _seed_ids tt
LEFT JOIN _seed_ids tb ON tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO events (
  tenant_id, business_id, slug, name, description, banner_url,
  starts_at, ends_at, venue, address, lat, lng, is_free, ticket_from
)
SELECT tt.db_id, NULL,
  'feira-de-artesanato', 'Feira de Artesanato e Sabores', 'Produtores locais, food trucks e atrações para toda a família.', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=80',
  NOW() + INTERVAL '2 days',
  NOW() + INTERVAL '2 days',
  'Praça Central', 'Praça Procópio Cardoso - Centro', -16.1715, -42.2918, true,
  0
FROM _seed_ids tt

WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO events (
  tenant_id, business_id, slug, name, description, banner_url,
  starts_at, ends_at, venue, address, lat, lng, is_free, ticket_from
)
SELECT tt.db_id, NULL,
  'festival-gastronomico-mc', 'Festival Gastronômico do Norte de Minas', 'Chefs regionais apresentam o melhor da cozinha sertaneja.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
  NOW() + INTERVAL '8 days',
  NOW() + INTERVAL '11 days',
  'Centro de Convenções', 'Av. Cula Mangabeira, 100 - Montes Claros/MG', -16.728, -43.857, false,
  30
FROM _seed_ids tt

WHERE tt.fixture_id = 't-montes-claros' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO news (tenant_id, slug, title, excerpt, cover_url, author, published_at)
SELECT tt.db_id, 'salinas-bate-recorde-de-turistas', 'Salinas bate recorde de turistas na alta temporada', 'Rede hoteleira registra ocupação acima de 90% impulsionada pelo turismo da cachaça.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80', 'Redação Minha Cidade',
  NOW() - INTERVAL '1 days'
FROM _seed_ids tt
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO news (tenant_id, slug, title, excerpt, cover_url, author, published_at)
SELECT tt.db_id, 'nova-praca-revitalizada-no-centro', 'Praça central é revitalizada e ganha área de lazer', 'Obra inclui playground, academia ao ar livre e novo paisagismo no coração da cidade.', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=80', 'Redação Minha Cidade',
  NOW() - INTERVAL '3 days'
FROM _seed_ids tt
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO news (tenant_id, slug, title, excerpt, cover_url, author, published_at)
SELECT tt.db_id, 'feira-do-produtor-amplia-horario', 'Feira do produtor amplia horário de funcionamento', 'Agora os moradores podem aproveitar produtos frescos também no fim da tarde.', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=80', 'Redação Minha Cidade',
  NOW() - INTERVAL '5 days'
FROM _seed_ids tt
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 5, 'Melhor comida mineira da região! O fogão a lenha faz toda diferença.',
  NOW() - INTERVAL '4 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE rv.comment = 'Melhor comida mineira da região! O fogão a lenha faz toda diferença.'
);

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 4, 'Atendimento ótimo e porções generosas. Feijoada nota 10.',
  NOW() - INTERVAL '9 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE rv.comment = 'Atendimento ótimo e porções generosas. Feijoada nota 10.'
);

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 5, 'Degustação incrível, aprendi muito sobre a cachaça de Salinas.',
  NOW() - INTERVAL '2 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-cachacaria' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-cachacaria'
  WHERE rv.comment = 'Degustação incrível, aprendi muito sobre a cachaça de Salinas.'
);

INSERT INTO reviews (tenant_id, business_id, rating, comment, created_at)
SELECT tt.db_id, tb.db_id, 5, 'Saí renovada! Profissionais super atenciosas.',
  NOW() - INTERVAL '6 days'
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-studio-bella' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM reviews rv
  JOIN _seed_ids tb2 ON tb2.db_id = rv.business_id AND tb2.fixture_id = 'b-studio-bella'
  WHERE rv.comment = 'Saí renovada! Profissionais super atenciosas.'
);

COMMIT;
