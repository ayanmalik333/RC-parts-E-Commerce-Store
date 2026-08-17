import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Clock, User, Sparkles, BookOpen, Globe, Cpu } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { blogs, selectedBlogSlug, products, setCurrentPage } = useStore();

  const article = blogs.find(b => b.slug === selectedBlogSlug) || blogs[0];

  // Inject Meta Title and Meta Description for Search indexing
  useEffect(() => {
    if (article) {
      const pageTitle = article.metaTitle || `${article.title} | TechRcPro`;
      document.title = pageTitle;

      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', article.metaDescription || article.excerpt);

      return () => {
        document.title = 'TechRcPro | High-Performance RC Parts & Upgrades';
      };
    }
  }, [article]);

  if (!article) return null;

  // Find recommended products linked to this blog post
  const recommendedProducts = products.filter(p => 
    article.recommendedProductIds && article.recommendedProductIds.includes(p.id)
  );

  const isHtmlMarkup = article.content && article.content.includes('<') && article.content.includes('>');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button & SEO Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          id="blog-detail-back-btn"
          onClick={() => setCurrentPage('blogs')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tuning Guides</span>
        </button>

        {article.metaTitle && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0284C7]/20 border border-[#0284C7]/30 text-[11px] font-mono text-[#38BDF8]">
            <Globe className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">SEO Meta: {article.metaTitle}</span>
          </div>
        )}
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/20 text-[#38BDF8] text-xs font-bold uppercase tracking-wider border border-[#0284C7]/30">
          <BookOpen className="w-3.5 h-3.5" />
          {article.category}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] leading-tight">
          {article.title}
        </h1>

        {article.metaDescription && (
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed max-w-2xl italic border-l-2 border-[#0284C7] pl-3">
            Summary: "{article.metaDescription}"
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#94A3B8] border-y border-[#1E293B] py-3">
          <span className="flex items-center gap-1.5 font-medium text-[#F8FAFC]">
            <User className="w-3.5 h-3.5 text-[#38BDF8]" />
            {article.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            {article.readTime}
          </span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
      </header>

      {/* Main Image */}
      {article.image && (
        <div className="aspect-16/9 rounded-3xl overflow-hidden border border-[#1E293B] shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Body Content */}
      <div className="bg-[#131D31] rounded-3xl p-6 sm:p-10 border border-[#1E293B]">
        {isHtmlMarkup ? (
          <div 
            className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-[#94A3B8]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-[#94A3B8] font-light whitespace-pre-line">
            {article.content}
          </div>
        )}
      </div>

      {/* Recommended Products for this Guide */}
      {recommendedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#1E293B]">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#38BDF8]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#38BDF8]">
              Recommended Upgrades Featured in this Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
