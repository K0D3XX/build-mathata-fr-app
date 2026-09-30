'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Check, Download, Laptop, ShieldCheck, Sparkles } from 'lucide-react'

type Platform = 'windows' | 'macos'
type Release = { tag_name?: string; assets?: { name: string; browser_download_url: string }[] }

const FALLBACK_URL = 'https://github.com/K0D3XX/build-mathata-fr-app/releases/latest'
const RELEASE_API = 'https://api.github.com/repos/K0D3XX/build-mathata-fr-app/releases/latest'

export default function Page() {
  const [platform, setPlatform] = useState<Platform>('windows')
  const [release, setRelease] = useState<Release | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    setPlatform(userAgent.includes('mac') ? 'macos' : 'windows')
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetch(RELEASE_API, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => {
        if (!response.ok) throw new Error('Release unavailable')
        return response.json() as Promise<Release>
      })
      .then(setRelease)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setFailed(true)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const downloads = useMemo(() => {
    const assets = release?.assets ?? []
    return {
      windows: assets.find((asset) => asset.name.endsWith('-setup.exe'))?.browser_download_url ?? FALLBACK_URL,
      macos: assets.find((asset) => asset.name.endsWith('.dmg'))?.browser_download_url ?? FALLBACK_URL,
    }
  }, [release])

  const button = (kind: Platform) => {
    const primary = platform === kind
    const label = kind === 'windows' ? 'Download for Windows' : 'Download for macOS'
    const href = downloads[kind]
    return (
      <a className={`download-button ${primary ? 'primary' : 'secondary'}`} href={loading ? undefined : href} aria-disabled={loading} onClick={(event) => loading && event.preventDefault()}>
        <span className="download-icon"><Download size={19} /></span>
        <span><strong>{label}</strong><small>{loading ? 'Checking latest release…' : kind === 'windows' ? 'Windows installer' : 'Universal disk image'}</small></span>
        <ArrowUpRight className="button-arrow" size={18} />
      </a>
    )
  }

  return (
    <main className="download-page">
      <nav className="download-nav" aria-label="Main navigation">
        <a className="download-brand" href="#top" aria-label="Mathata home"><span className="download-brand-mark">M</span><span><b>Mathata</b><small>Focus, your way.</small></span></a>
        <a className="github-link" href="https://github.com/K0D3XX/build-mathata-fr-app/releases" target="_blank" rel="noreferrer">Releases <ArrowUpRight size={14} /></a>
      </nav>

      <section className="download-hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow-pill"><Sparkles size={14} /> Your study space, now on desktop</div>
          <h1>Study with a little more <em>Mathata.</em></h1>
          <p>A playful, focused desktop planner for turning big study goals into small, doable wins.</p>
          <div className="download-actions" aria-label="Download options">{button('windows')}{button('macos')}</div>
          <div className="release-meta" aria-live="polite">{failed ? <><span className="status-dot warning" /> Couldn&apos;t check the latest release. <a href={FALLBACK_URL}>View releases on GitHub</a></> : <><span className="status-dot" /> Latest release: <strong>{release?.tag_name ?? 'Checking…'}</strong></>}</div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="art-window"><div className="window-bar"><i /><i /><i /><span>mathata</span></div><div className="art-content"><div className="art-sidebar" /><div className="art-lines"><b /><b /><b /><div className="art-card"><span>Today</span><strong>Small steps</strong><i /></div></div></div></div><div className="floating-badge"><Check size={15} /> Built for focus</div></div>
      </section>

      <section className="help-section" id="help"><div className="help-heading"><span className="eyebrow-pill subtle"><ShieldCheck size={14} /> Quick start</span><h2>Installation help</h2><p>Everything you need to get Mathata running on your machine.</p></div><div className="help-grid"><article className="help-card"><div className="help-card-icon windows-icon"><Laptop size={21} /></div><div><h3>Windows</h3><p>If you see <strong>“Windows protected your PC”</strong>, click <strong>More info</strong>, then <strong>Run anyway</strong>. This appears because the app is new and not yet code-signed.</p></div></article><article className="help-card"><div className="help-card-icon mac-icon"><span>⌘</span></div><div><h3>macOS</h3><p>Open the <strong>.dmg</strong>, then drag Mathata into Applications. The first time, right-click the app, choose <strong>Open</strong>, then choose <strong>Open</strong> again.</p></div></article></div></section>
      <footer className="download-footer"><span>Mathata · a better way to begin.</span><a href="#help">Installation help <ArrowUpRight size={14} /></a></footer>
    </main>
  )
}

// Download URLs are resolved from GitHub at runtime so the page always follows the latest release.
