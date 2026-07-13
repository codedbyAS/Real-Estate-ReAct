import { useEffect, useMemo, useState } from 'react'
import './App.css'

const photos = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85',
]

const properties = [
  { id:1, price:24500000, address:'Calle Arquímedes 118', city:'Polanco, Ciudad de México', beds:4, baths:4.5, area:410, type:'Casa', year:2021, parking:3, image:photos[0], rating:4.9, reviews:27 },
  { id:2, price:12800000, address:'Av. Santa Fe 498', city:'Santa Fe, Ciudad de México', beds:3, baths:3, area:240, type:'Departamento', year:2020, parking:2, image:photos[1], rating:4.7, reviews:19 },
  { id:3, price:18950000, address:'Paseo de los Virreyes 625', city:'Zapopan, Jalisco', beds:4, baths:4, area:520, type:'Casa', year:2019, parking:4, image:photos[2], rating:4.8, reviews:31 },
  { id:4, price:15900000, address:'Aldea Zama, Av. Itzamná', city:'Tulum, Quintana Roo', beds:3, baths:3.5, area:285, type:'Villa', year:2023, parking:2, image:photos[3], rating:4.9, reviews:42 },
  { id:5, price:21300000, address:'Av. del Roble 660', city:'San Pedro Garza García, Nuevo León', beds:4, baths:5, area:460, type:'Casa', year:2022, parking:3, image:photos[4], rating:4.8, reviews:24 },
  { id:6, price:9800000, address:'Blvd. Kukulcán Km 12.5', city:'Cancún, Quintana Roo', beds:2, baths:2.5, area:175, type:'Departamento', year:2021, parking:1, image:photos[5], rating:4.6, reviews:36 },
]

const translations = {
  es: {
    buy:'Comprar',
    rent:'Rentar',
    sell:'Vender',
    cities:'Ciudades',
    start:'Comenzar',
    searchLabel:'Busca por ciudad, estado o tipo',
    searchButton:'Buscar',
    heroEyebrow:'Propiedades excepcionales en México',
    heroTitle:['Encuentra un lugar', 'que se sienta como hogar'],
    heroCopy:'Explora propiedades seleccionadas en las mejores ciudades y destinos de México.',
    featured:'Seleccionadas para ti',
    results:'Resultados para “{query}”',
    defaultHeading:'Propiedades destacadas',
    saved:'{count} propiedades guardadas',
    empty:'No encontramos propiedades. Prueba “México”, “Tulum” o “Casa”.',
    viewAll:'Ver todas las propiedades',
    ctaEyebrow:'Tu próxima decisión comienza aquí',
    ctaTitle:'¿Vendes o compras?',
    ctaCopy:'Elige la opción que te corresponde y comparte tus datos con un experto local.',
    ctaButton:'Solicitar valoración',
    leadSectionTitle:'Vender o comprar con PropEdge',
    leadSectionSubtitle:'Elige el camino que te interesa y llena el formulario.',
    sellOption:'Vender',
    buyOption:'Comprar',
    sellFormTitle:'Vende tu propiedad',
    sellFormSubtitle:'Cuéntanos sobre tu propiedad y te ayudaremos con una valoración.',
    buyFormTitle:'Compra una propiedad',
    buyFormSubtitle:'Compártenos lo que buscas y te ayudaremos a encontrarlo.',
    ownerInfoTitle:'Información del propietario',
    ownerInfoSubtitle:'Comparte los datos del propietario para iniciar la valoración.',
    ownerName:'Nombre del propietario',
    ownerEmail:'Correo del propietario',
    ownerPhone:'Teléfono del propietario',
    ownerAddress:'Dirección del propietario',
    ownerCity:'Ciudad del propietario',
    propertyInfoTitle:'Detalles de la propiedad',
    propertyInfoSubtitle:'Describe la propiedad con la mayor precisión posible.',
    propertyAddress:'Dirección de la propiedad',
    propertyCity:'Ciudad de la propiedad',
    propertyType:'Tipo de propiedad',
    bedrooms:'Recámaras',
    bathrooms:'Baños',
    area:'Superficie (m²)',
    price:'Precio estimado',
    yearBuilt:'Año de construcción',
    parking:'Estacionamientos',
    propertyDescription:'Descripción de la propiedad',
    budget:'Presupuesto',
    notes:'Notas',
    submitSell:'Guardar solicitud de venta',
    submitBuy:'Guardar solicitud de compra',
    successSell:'Tu solicitud de venta se guardó en un archivo CSV.',
    successBuy:'Tu solicitud de compra se guardó en un archivo CSV.',
    back:'Volver a resultados',
    save:'Guardar',
    savedLabel:'Guardada',
    forSale:'En venta',
    bedrooms:'Recámaras',
    bathrooms:'Baños',
    construction:'Construcción',
    parking:'Estacionamientos',
    about:'Acerca de esta propiedad',
    features:'Características',
    details:'Detalles de la propiedad',
    type:'Tipo',
    year:'Año',
    reviews:'reseñas',
    detailsLink:'Ver detalles →',
    propertyAlt:'{type} en {city}',
    savePropertyAria:'Guardar propiedad',
    toggleLabel:'Cambiar idioma',
    advisor:'Tu asesor',
    advisorText:'Conecta con un experto local para recibir información detallada sobre esta propiedad.',
    scheduleVisit:'Agendar visita',
    advisorRole:'Asesora de bienes raíces',
    agentFormTitle:'Contáctanos',
    agentFormSubtitle:'Comparte tus datos y te ayudaremos a encontrar la mejor opción.',
    agentName:'Nombre completo',
    agentEmail:'Correo electrónico',
    agentPhone:'Teléfono',
    agentArea:'Área de interés',
    agentNotes:'Notas',
    agentSubmit:'Guardar información',
    agentSuccess:'La información se guardó en un archivo CSV.',
    preferredDate:'Fecha preferida',
    preferredTime:'Hora preferida',
    visitSubmit:'Guardar visita',
    visitSuccess:'Tu solicitud de visita se guardó correctamente.',
    footerLine:'Bienes raíces en México, de forma personal.',
    footerNote:'© 2026 PropEdge. Datos de demostración.',
  },
  en: {
    buy:'Buy',
    rent:'Rent',
    sell:'Sell',
    cities:'Cities',
    start:'Get started',
    searchLabel:'Search by city, state or type',
    searchButton:'Search',
    heroEyebrow:'Exceptional properties in Mexico',
    heroTitle:['Find a place', 'that feels like home'],
    heroCopy:'Explore selected properties in the best cities and destinations in Mexico.',
    featured:'Selected for you',
    results:'Results for “{query}”',
    defaultHeading:'Featured properties',
    saved:'{count} saved properties',
    empty:'We could not find properties. Try “Mexico”, “Tulum” or “House”.',
    viewAll:'View all properties',
    ctaEyebrow:'Your next decision starts here',
    ctaTitle:'Sell or buy with PropEdge',
    ctaCopy:'Choose the option that fits your goal and share your details with a local expert.',
    ctaButton:'Request valuation',
    leadSectionTitle:'Sell or buy with PropEdge',
    leadSectionSubtitle:'Choose the path that fits you best and complete the form.',
    sellOption:'Sell',
    buyOption:'Buy',
    sellFormTitle:'Sell your property',
    sellFormSubtitle:'Tell us about your property and we will arrange a valuation.',
    buyFormTitle:'Buy a property',
    buyFormSubtitle:'Tell us what you are looking for and we will help you find it.',
    ownerInfoTitle:'Owner information',
    ownerInfoSubtitle:'Share the owner details so we can start the valuation.',
    ownerName:'Owner full name',
    ownerEmail:'Owner email',
    ownerPhone:'Owner phone',
    ownerAddress:'Owner address',
    ownerCity:'Owner city',
    propertyInfoTitle:'Property details',
    propertyInfoSubtitle:'Describe the property as clearly as possible.',
    propertyAddress:'Property address',
    propertyCity:'Property city',
    propertyType:'Property type',
    bedrooms:'Bedrooms',
    bathrooms:'Bathrooms',
    area:'Area (m²)',
    price:'Estimated price',
    yearBuilt:'Year built',
    parking:'Parking spaces',
    propertyDescription:'Property description',
    budget:'Budget',
    notes:'Notes',
    submitSell:'Save sell request',
    submitBuy:'Save buy request',
    successSell:'Your sell request was saved to a CSV file.',
    successBuy:'Your buy request was saved to a CSV file.',
    back:'Back to results',
    save:'Save',
    savedLabel:'Saved',
    forSale:'For sale',
    bedrooms:'Bedrooms',
    bathrooms:'Bathrooms',
    construction:'Construction',
    parking:'Parking',
    about:'About this property',
    features:'Features',
    details:'Property details',
    type:'Type',
    year:'Year',
    reviews:'reviews',
    detailsLink:'View details →',
    propertyAlt:'{type} in {city}',
    savePropertyAria:'Save property',
    toggleLabel:'Switch language',
    advisor:'Your advisor',
    advisorText:'Connect with a local expert for detailed information about this property.',
    scheduleVisit:'Schedule a visit',
    advisorRole:'Real estate advisor',
    agentFormTitle:'Contact us',
    agentFormSubtitle:'Share your details and we will help you find the right option.',
    agentName:'Full name',
    agentEmail:'Email address',
    agentPhone:'Phone',
    agentArea:'Preferred area',
    agentNotes:'Notes',
    agentSubmit:'Save information',
    agentSuccess:'The information was saved to a CSV file.',
    preferredDate:'Preferred date',
    preferredTime:'Preferred time',
    visitSubmit:'Save visit request',
    visitSuccess:'Your visit request was saved successfully.',
    footerLine:'Real estate in Mexico, in a personal way.',
    footerNote:'© 2026 PropEdge. Demo data.',
  },
}

function Icon({ name }) {
  const paths = {
    pin: (<><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.3" /></>),
    search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>),
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5a5.5 5.5 0 0 0 1.1-8.9Z" />,
    user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    back: <path d="m15 18-6-6 6-6" />,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

const formatPrice = (value) => new Intl.NumberFormat('es-MX', { style:'currency', currency:'MXN', maximumFractionDigits:0 }).format(value)

const downloadCsv = (filename, rows) => {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function Header({ menuOpen, setMenuOpen, language, toggleLanguage }) {
  const t = translations[language]
  return (
    <header className="site-header">
      <div className="header-left">
        <a className="brand" href="#/" aria-label="PropEdge home">Prop<span>Edge</span></a>
      </div>
      <nav className={menuOpen ? 'open' : ''}>
        <a href="#/#properties">{t.buy}</a>
        <a href="#/#properties">{t.rent}</a>
        <a href="#/#sell">{t.sell}</a>
        <a href="#/#properties">{t.cities}</a>
      </nav>
      <div className="header-actions">
        <button className="lang-toggle" onClick={toggleLanguage} aria-label={t.toggleLabel}>{language === 'es' ? 'EN' : 'ES'}</button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name="menu" /></button>
        <button className="account-button"><Icon name="user" /> {t.start}</button>
      </div>
    </header>
  )
}

function PropertyCard({ property, favorites, toggleFavorite, language }) {
  const t = translations[language]
  const alt = t.propertyAlt.replace('{type}', property.type).replace('{city}', property.city)
  return (
    <article className="property-card">
      <div className="property-image">
        <a href={`#/property/${property.id}`}><img src={property.image} alt={alt} /></a>
        <span>{property.type}</span>
        <button className={favorites.includes(property.id) ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(property.id)} aria-label={t.savePropertyAria}><Icon name="heart" /></button>
      </div>
      <div className="property-details">
        <h3>{formatPrice(property.price)}</h3>
        <p>{property.address}, {property.city}</p>
        <div className="features">
          <span>▱ {property.beds} {language === 'es' ? 'rec.' : 'beds'}</span>
          <span>♧ {property.baths} {language === 'es' ? 'baños' : 'baths'}</span>
          <a href={`#/property/${property.id}`}>{t.detailsLink}</a>
        </div>
      </div>
    </article>
  )
}

function Home({ favorites, toggleFavorite, language }) {
  const t = translations[language]
  const [query, setQuery] = useState(language === 'es' ? 'México' : 'Mexico')
  const [submitted, setSubmitted] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [leadType, setLeadType] = useState('sell')
  const [sellForm, setSellForm] = useState({ ownerName:'', ownerEmail:'', ownerPhone:'', ownerAddress:'', ownerCity:'', propertyAddress:'', propertyCity:'', propertyType:'', bedrooms:'', bathrooms:'', area:'', price:'', yearBuilt:'', parking:'', description:'', notes:'' })
  const [buyForm, setBuyForm] = useState({ name:'', email:'', phone:'', propertyType:'', budget:'', area:'', notes:'' })
  const [leadMessage, setLeadMessage] = useState('')
  const [leadEntries, setLeadEntries] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('leadEntries') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('leadEntries', JSON.stringify(leadEntries))
    }
  }, [leadEntries])

  const visible = useMemo(() => {
    const found = properties.filter((p) => `${p.address} ${p.city} ${p.type} México Mexico`.toLowerCase().includes(submitted.toLowerCase()))
    return showAll ? found : found.slice(0, 3)
  }, [showAll, submitted])

  const search = (e) => {
    e.preventDefault()
    setSubmitted(query.trim())
    setShowAll(true)
    setTimeout(() => document.querySelector('#properties')?.scrollIntoView({ behavior:'smooth' }), 50)
  }

  const handleLeadChange = (type) => (e) => {
    const { name, value } = e.target
    if (type === 'sell') {
      setSellForm((current) => ({ ...current, [name]: value }))
    } else {
      setBuyForm((current) => ({ ...current, [name]: value }))
    }
  }

  const handleLeadSubmit = (e) => {
    e.preventDefault()
    const currentForm = leadType === 'sell' ? sellForm : buyForm
    const entry = {
      ...currentForm,
      type: leadType,
      submittedAt: new Date().toISOString(),
    }
    const updatedEntries = [...leadEntries, entry]
    setLeadEntries(updatedEntries)

    const headers = ['type', 'name', 'email', 'phone', 'propertyType', 'area', 'budget', 'notes', 'submittedAt']
    const rows = [headers, ...updatedEntries.map((item) => [item.type, item.name, item.email, item.phone, item.propertyType, item.area || '', item.budget || '', item.notes, item.submittedAt])]
    downloadCsv(leadType === 'sell' ? 'sell-leads.csv' : 'buy-leads.csv', rows)
    setLeadMessage(leadType === 'sell' ? t.successSell : t.successBuy)
    if (leadType === 'sell') {
      setSellForm({ ownerName:'', ownerEmail:'', ownerPhone:'', ownerAddress:'', ownerCity:'', propertyAddress:'', propertyCity:'', propertyType:'', bedrooms:'', bathrooms:'', area:'', price:'', yearBuilt:'', parking:'', description:'', notes:'' })
    } else {
      setBuyForm({ name:'', email:'', phone:'', propertyType:'', budget:'', area:'', notes:'' })
    }
  }

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle[0]}<br />{t.heroTitle[1]}</h1>
          <p className="hero-copy">{t.heroCopy}</p>
          <form className="search-box" onSubmit={search}>
            <Icon name="pin" />
            <label>
              <span>{t.searchLabel}</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label={t.searchLabel} />
            </label>
            <button><Icon name="search" /> {t.searchButton}</button>
          </form>
        </div>
      </section>

      <section className="properties-section" id="properties">
        <div className="section-heading">
          <div>
            <p className="eyebrow gold">{t.featured}</p>
            <h2>{submitted ? t.results.replace('{query}', submitted) : t.defaultHeading}</h2>
          </div>
          <p>{t.saved.replace('{count}', String(favorites.length))}</p>
        </div>
        {visible.length ? (
          <div className="property-grid">
            {visible.map((p) => <PropertyCard key={p.id} property={p} favorites={favorites} toggleFavorite={toggleFavorite} language={language} />)}
          </div>
        ) : <p className="empty">{t.empty}</p>}
        {!showAll && <button className="outline-button" onClick={() => setShowAll(true)}>{t.viewAll}</button>}
      </section>

      <section className="cta" id="sell">
        <p className="eyebrow gold">{t.ctaEyebrow}</p>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaCopy}</p>
        <div className="lead-toggle">
          <button type="button" className={leadType === 'sell' ? 'lead-toggle-button active' : 'lead-toggle-button'} onClick={() => setLeadType('sell')}>{t.sellOption}</button>
          <button type="button" className={leadType === 'buy' ? 'lead-toggle-button active' : 'lead-toggle-button'} onClick={() => setLeadType('buy')}>{t.buyOption}</button>
        </div>
        <form className="agent-form" onSubmit={handleLeadSubmit}>
          <div className="agent-form-header">
            <h3>{leadType === 'sell' ? t.sellFormTitle : t.buyFormTitle}</h3>
            <p>{leadType === 'sell' ? t.sellFormSubtitle : t.buyFormSubtitle}</p>
          </div>
          {leadType === 'sell' ? (
            <>
              <div className="lead-form-section">
                <h4>{t.ownerInfoTitle}</h4>
                <p>{t.ownerInfoSubtitle}</p>
                <div className="agent-form-grid">
                  <label>
                    <span>{t.ownerName}</span>
                    <input name="ownerName" value={sellForm.ownerName} onChange={handleLeadChange('sell')} required />
                  </label>
                  <label>
                    <span>{t.ownerEmail}</span>
                    <input type="email" name="ownerEmail" value={sellForm.ownerEmail} onChange={handleLeadChange('sell')} required />
                  </label>
                  <label>
                    <span>{t.ownerPhone}</span>
                    <input name="ownerPhone" value={sellForm.ownerPhone} onChange={handleLeadChange('sell')} required />
                  </label>
                  <label>
                    <span>{t.ownerAddress}</span>
                    <input name="ownerAddress" value={sellForm.ownerAddress} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.ownerCity}</span>
                    <input name="ownerCity" value={sellForm.ownerCity} onChange={handleLeadChange('sell')} />
                  </label>
                </div>
              </div>
              <div className="lead-form-section">
                <h4>{t.propertyInfoTitle}</h4>
                <p>{t.propertyInfoSubtitle}</p>
                <div className="agent-form-grid">
                  <label>
                    <span>{t.propertyAddress}</span>
                    <input name="propertyAddress" value={sellForm.propertyAddress} onChange={handleLeadChange('sell')} required />
                  </label>
                  <label>
                    <span>{t.propertyCity}</span>
                    <input name="propertyCity" value={sellForm.propertyCity} onChange={handleLeadChange('sell')} required />
                  </label>
                  <label>
                    <span>{t.propertyType}</span>
                    <input name="propertyType" value={sellForm.propertyType} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.bedrooms}</span>
                    <input name="bedrooms" value={sellForm.bedrooms} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.bathrooms}</span>
                    <input name="bathrooms" value={sellForm.bathrooms} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.area}</span>
                    <input name="area" value={sellForm.area} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.price}</span>
                    <input name="price" value={sellForm.price} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.yearBuilt}</span>
                    <input name="yearBuilt" value={sellForm.yearBuilt} onChange={handleLeadChange('sell')} />
                  </label>
                  <label>
                    <span>{t.parking}</span>
                    <input name="parking" value={sellForm.parking} onChange={handleLeadChange('sell')} />
                  </label>
                </div>
              </div>
            </>
          ) : (
            <div className="agent-form-grid">
              <label>
                <span>{t.agentName}</span>
                <input name="name" value={buyForm.name} onChange={handleLeadChange('buy')} required />
              </label>
              <label>
                <span>{t.agentEmail}</span>
                <input type="email" name="email" value={buyForm.email} onChange={handleLeadChange('buy')} required />
              </label>
              <label>
                <span>{t.agentPhone}</span>
                <input name="phone" value={buyForm.phone} onChange={handleLeadChange('buy')} required />
              </label>
              <label>
                <span>{t.propertyType}</span>
                <input name="propertyType" value={buyForm.propertyType} onChange={handleLeadChange('buy')} />
              </label>
              <label>
                <span>{t.budget}</span>
                <input name="budget" value={buyForm.budget} onChange={handleLeadChange('buy')} />
              </label>
              <label>
                <span>{t.agentArea}</span>
                <input name="area" value={buyForm.area} onChange={handleLeadChange('buy')} />
              </label>
            </div>
          )}
          <label className="agent-notes">
            <span>{leadType === 'sell' ? t.propertyDescription : t.notes}</span>
            <textarea name="description" value={leadType === 'sell' ? sellForm.description : buyForm.notes} onChange={handleLeadChange(leadType)} rows="3" />
          </label>
          <label className="agent-notes">
            <span>{t.notes}</span>
            <textarea name="notes" value={leadType === 'sell' ? sellForm.notes : buyForm.notes} onChange={handleLeadChange(leadType)} rows="3" />
          </label>
          <button type="submit" className="agent-submit">{leadType === 'sell' ? t.submitSell : t.submitBuy}</button>
          {leadMessage ? <p className="agent-form-status">{leadMessage}</p> : null}
        </form>
      </section>
    </>
  )
}

function PropertyDetail({ property, favorites, toggleFavorite, language }) {
  const t = translations[language]
  const [visitOpen, setVisitOpen] = useState(false)
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('')
  const [visitMessage, setVisitMessage] = useState('')
  const description = language === 'es'
    ? `Residencia contemporánea ubicada en una de las zonas más atractivas de ${property.city}. Sus espacios luminosos, materiales de alta calidad y distribución funcional crean un hogar ideal para la vida moderna. La propiedad combina privacidad, comodidad y fácil acceso a restaurantes, escuelas, parques y servicios.`
    : `Contemporary residence located in one of the most attractive areas of ${property.city}. Its bright spaces, high-quality materials, and functional layout create an ideal home for modern living. The property combines privacy, comfort, and easy access to restaurants, schools, parks, and services.`
  const amenities = language === 'es'
    ? ['Cocina integral', 'Terraza privada', 'Seguridad 24 horas', 'Aire acondicionado', 'Área de lavado', 'Jardín', 'Bodega', 'Acepta mascotas']
    : ['Integrated kitchen', 'Private terrace', '24/7 security', 'Air conditioning', 'Laundry area', 'Garden', 'Storage', 'Pet friendly']

  const handleVisitSubmit = (e) => {
    e.preventDefault()
    if (!visitDate || !visitTime) return

    const visitRequest = {
      propertyId: property.id,
      propertyAddress: property.address,
      preferredDate: visitDate,
      preferredTime: visitTime,
      submittedAt: new Date().toISOString(),
    }

    let existing = []
    try {
      existing = JSON.parse(localStorage.getItem('visitRequests') || '[]')
    } catch {
      existing = []
    }

    const updated = [...existing, visitRequest]
    localStorage.setItem('visitRequests', JSON.stringify(updated))

    const headers = ['propertyId', 'propertyAddress', 'preferredDate', 'preferredTime', 'submittedAt']
    const rows = [headers, ...updated.map((item) => [item.propertyId, item.propertyAddress, item.preferredDate, item.preferredTime, item.submittedAt])]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'visit-requests.csv'
    link.click()
    URL.revokeObjectURL(url)

    setVisitDate('')
    setVisitTime('')
    setVisitMessage(t.visitSuccess)
    setVisitOpen(false)
  }

  return (
    <div className="detail-page">
      <div className="detail-bar">
        <a href="#/"><Icon name="back" /> {t.back}</a>
        <button className={favorites.includes(property.id) ? 'save-detail active' : 'save-detail'} onClick={() => toggleFavorite(property.id)}>
          <Icon name="heart" /> {favorites.includes(property.id) ? t.savedLabel : t.save}
        </button>
      </div>
      <div className="gallery">
        <img className="gallery-main" src={property.image} alt={property.address} />
        {[1, 2, 3, 4].map((n, i) => <img key={n} src={photos[(property.id + i) % photos.length]} alt={`Vista ${n + 2} de la propiedad`} />)}
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="listing-title">
            <div>
              <p className="status">● {t.forSale}</p>
              <h1>{formatPrice(property.price)}</h1>
              <p>{property.address}, {property.city}, México</p>
            </div>
            <div className="rating">
              <strong>★ {property.rating}</strong>
              <span>{property.reviews} {t.reviews}</span>
            </div>
          </div>
          <div className="quick-facts">
            <div><b>{property.beds}</b><span>{t.bedrooms}</span></div>
            <div><b>{property.baths}</b><span>{t.bathrooms}</span></div>
            <div><b>{property.area} m²</b><span>{t.construction}</span></div>
            <div><b>{property.parking}</b><span>{t.parking}</span></div>
          </div>
          <section className="detail-section">
            <h2>{t.about}</h2>
            <p>{description}</p>
          </section>
          <section className="detail-section">
            <h2>{t.features}</h2>
            <div className="amenities">{amenities.map((x) => <span key={x}>✓ {x}</span>)}</div>
          </section>
          <section className="detail-section">
            <h2>{t.details}</h2>
            <dl className="detail-list">
              <div><dt>{t.type}</dt><dd>{property.type}</dd></div>
              <div><dt>{t.year}</dt><dd>{property.year}</dd></div>
              <div><dt>{t.parking}</dt><dd>{property.parking}</dd></div>
            </dl>
          </section>
        </div>
        <aside className="contact-card">
          <h2>{t.advisor}</h2>
          <p>{t.advisorText}</p>
          <button onClick={() => setVisitOpen((current) => !current)}>{t.scheduleVisit}</button>
          {visitOpen ? (
            <form className="visit-form" onSubmit={handleVisitSubmit}>
              <label>
                <span>{t.preferredDate}</span>
                <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required />
              </label>
              <label>
                <span>{t.preferredTime}</span>
                <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} required />
              </label>
              <button type="submit" className="visit-submit">{t.visitSubmit}</button>
              {visitMessage ? <p className="agent-form-status">{visitMessage}</p> : null}
            </form>
          ) : null}
          <div className="contact-info">
            <p><strong>Mariana López</strong><br />{t.advisorRole}</p>
            <p><strong>Tel.</strong> +52 55 1234 5678</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function App() {
  const [route, setRoute] = useState(location.hash || '#/')
  const [favorites, setFavorites] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState('es')
  const t = translations[language]

  useEffect(() => {
    const handler = () => {
      setRoute(location.hash || '#/')
      setMenuOpen(false)
      scrollTo(0, 0)
    }
    addEventListener('hashchange', handler)
    return () => removeEventListener('hashchange', handler)
  }, [])

  const toggleFavorite = (id) => setFavorites((items) => items.includes(id) ? items.filter((x) => x !== id) : [...items, id])
  const toggleLanguage = () => setLanguage((current) => current === 'es' ? 'en' : 'es')
  const match = route.match(/^#\/property\/(\d+)/)
  const property = match ? properties.find((p) => p.id === Number(match[1])) : null

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} language={language} toggleLanguage={toggleLanguage} />
      {property ? <PropertyDetail property={property} favorites={favorites} toggleFavorite={toggleFavorite} language={language} /> : <Home favorites={favorites} toggleFavorite={toggleFavorite} language={language} />}
      <footer>
        <a className="brand light" href="#/">Prop<span>Edge</span></a>
        <p>{t.footerLine}</p>
        <p>{t.footerNote}</p>
      </footer>
    </main>
  )
}

export default App
