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

COMMIT;
