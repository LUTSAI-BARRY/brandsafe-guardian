import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";

export function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-2">recent news</p>
          <h2 className="text-3xl font-bold mb-4" data-testid="text-blog-title">
            The latest from our blog.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              data-testid={`card-blog-post-${post.id}`}
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
                data-testid={`img-blog-post-${post.id}`}
              />
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2" data-testid={`text-blog-title-${post.id}`}>
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`text-blog-excerpt-${post.id}`}>
                  {post.excerpt}
                </p>
                <div className="text-xs text-muted-foreground" data-testid={`text-blog-date-${post.id}`}>
                  {post.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
