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
  'restaurante'::business_type,
  tc.db_id,
  tn.db_id,
  'Comida mineira de raiz servida no fogão a lenha. Buffet livre no almoço, à la carte à noite e a melhor feijoada da cidade aos sábados.',
  'Autêntica comida mineira no fogão a lenha.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  '5538999990002',
  '3899990002',
  'sabormineirosalinas',
  NULL,
  'Av. Tancredo Neves, 540 - Centro',
  -16.1709,
  -42.2925,
  'published'::entity_status,
  true,
  'premium'::plan_tier,
  2,
  4.7,
  489,
  '["mineira","feijoada","fogão a lenha","almoço"]',
  '["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-restaurantes' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-centro-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-sabor-mineiro', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'restaurante-sabor-mineiro';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 4
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 5, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
  WHERE bh.weekday = 5
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 6, '11:00', '23:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-sabor-mineiro' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-sabor-mineiro'
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
  'clinica-vida-saude',
  'Clínica Vida & Saúde',
  'servico'::business_type,
  tc.db_id,
  tn.db_id,
  'Centro médico multidisciplinar com clínicos, pediatras, exames laboratoriais e atendimento por convênios. Agendamento online e teleconsulta.',
  'Centro médico multidisciplinar com teleconsulta.',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80',
  '5538999990003',
  '3899990003',
  'clinicavidasalinas',
  'https://clinicavida.com.br',
  'Rua São José, 75 - Fátima',
  -16.1745,
  -42.289,
  'published'::entity_status,
  false,
  'premium'::plan_tier,
  3,
  4.8,
  156,
  '["saúde","exames","convênio","teleconsulta"]',
  '["https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"]'
FROM _seed_ids tt
JOIN _seed_ids tc ON tc.fixture_id = 'c-saude' AND tc.entity_type = 'category'
LEFT JOIN _seed_ids tn ON tn.fixture_id = 'n-fatima-sal' AND tn.entity_type = 'neighborhood'
WHERE tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
ON CONFLICT (tenant_id, slug) DO NOTHING;
INSERT INTO _seed_ids (fixture_id, entity_type, db_id)
SELECT 'b-clinica-vida', 'business', bs.id
FROM businesses bs
JOIN _seed_ids tt ON tt.db_id = bs.tenant_id AND tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE bs.slug = 'clinica-vida-saude';

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 0, NULL, NULL, true
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 0
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 1, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 1
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 2, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 2
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 3, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
AND NOT EXISTS (
  SELECT 1 FROM business_hours bh
  JOIN _seed_ids tb2 ON tb2.db_id = bh.business_id AND tb2.fixture_id = 'b-clinica-vida'
  WHERE bh.weekday = 3
);

INSERT INTO business_hours (tenant_id, business_id, weekday, opens_at, closes_at, closed)
SELECT tt.db_id, tb.db_id, 4, '07:00', '19:00', false
FROM _seed_ids tb
JOIN _seed_ids tt ON tt.fixture_id = 't-salinas' AND tt.entity_type = 'tenant'
WHERE tb.fixture_id = 'b-clinica-vida' AND tb.entity_type = 'business'
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
