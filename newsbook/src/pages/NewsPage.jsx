import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallbackNews from "../data/fallbackNews";

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const loadNews = async () => {
    setLoading(true);
    setErrorText("");

    try {
      const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=12");

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const normalized = (data.results || []).map((article) => ({
        id: article.id,
        title: article.title,
        summary: article.summary,
        source: article.news_site,
        publishedAt: article.published_at,
        imageUrl: article.image_url,
        link: article.url
      }));

      setArticles(normalized.length ? normalized : fallbackNews);
    } catch (error) {
      setErrorText("Live API not reachable. Showing fallback daily news.");
      setArticles(fallbackNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="page news-page">
      <div className="grain" aria-hidden="true"></div>

      <header className="news-header">
        <div>
          <p className="eyebrow">Second page</p>
          <h1>Today news in cards</h1>
          <p className="news-subtitle">Updated daily with headline, source, summary, and publish time.</p>
        </div>
        <div className="news-header-actions">
          <button type="button" className="btn btn-primary" onClick={loadNews}>
            Refresh Feed
          </button>
          <Link className="btn btn-ghost" to="/">
            Back To Landing
          </Link>
        </div>
      </header>

      {errorText ? <p className="status-message warning">{errorText}</p> : null}
      {loading ? <p className="status-message">Loading news cards...</p> : null}

      <section className="news-grid" aria-live="polite">
        {!loading &&
          articles.map((article) => (
            <article key={article.id} className="news-card">
              <div className="card-media">
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} loading="lazy" />
                ) : (
                  <div className="image-fallback">No image</div>
                )}
              </div>
              <div className="card-body">
                <p className="source">{article.source || "Global Desk"}</p>
                <h2>{article.title}</h2>
                <p className="summary">{article.summary || "No summary available for this story."}</p>
              </div>
              <div className="card-footer">
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </time>
                <a href={article.link} target="_blank" rel="noreferrer">
                  Read
                </a>
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}

export default NewsPage;