import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BookOpen, Clock, User, ArrowRight, Search, Cpu } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const { blogs, setSelectedBlogSlug, setCurrentPage } = useStore();
  const [blogSearch, setBlogSearch] = useState('');

  const filteredBlogs = blogs.filter(b => 
    !blogSearch || 
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
    (b.metaTitle && b.metaTitle.toLowerCase().includes(blogSearch.toLowerCase())) ||
    (b.metaDescription && b.metaDescription.toLowerCase().includes(blogSearch.toLowerCase()))
  );

  const handleReadArticle = (slug: string) => {
    setSelectedBlogSlug(slug);
    setCurrentPage('blog-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="bg-[#131D31] rounded-3xl p-8 sm:p-12 border border-[#1E293B] text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
          RC Engineering & Tuning Knowledge Base
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#F8FAFC]">
          RC Tuning & Powertrain Guides
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-xl mx-auto leading-relaxed">
          Technical guides on brushless motor KV calculations, LiPo C-rates, ESC timing profiles, and carbon fiber chassis suspension geometry.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
          <input
            id="blog-search-input"
            type="text"
            placeholder="Search tuning guides, KV ratios, LiPo safety..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0B0F19] text-[#F8FAFC] border border-[#1E293B] rounded-xl focus:outline-none focus:border-[#0284C7] placeholder-[#64748B]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map(article => (
          <article
            key={article.id}
            id={`blog-card-${article.id}`}
            onClick={() => handleReadArticle(article.slug)}
            className="group bg-[#131D31] rounded-3xl overflow-hidden border border-[#1E293B] hover:border-[#0284C7] transition-all duration-300 hover:shadow-xl hover:shadow-sky-950/40 flex flex-col cursor-pointer"
          >
            <div className="aspect-16/10 overflow-hidden relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#0B0F19]/90 backdrop-blur-xs text-[#38BDF8] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#0284C7]/30">
                {article.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-[#94A3B8]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#38BDF8]" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#38BDF8] group-hover:text-[#0284C7] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs font-bold text-[#38BDF8]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span className="text-[#94A3B8] font-normal">{article.author.split(',')[0]}</span>
                </span>

                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
