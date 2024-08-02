 "use client"
import React, { useState } from 'react';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const BlogApp = () => {
  const [articles, setArticles] = useState<{ id: number, title: string, content: string }[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (editingId !== null) {
      setArticles(articles.map(article => 
        article.id === editingId ? {...article, title, content} : article
      ));
      setEditingId(null);
    } else {
      setArticles([...articles, { id: Date.now(), title, content }]);
    }
    setTitle('');
    setContent('');
  };

  const handleEdit = (article: { id: any; title: any; content: any; }) => {
    setTitle(article.title);
    setContent(article.content);
    setEditingId(article.id);
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Examen de calidad de Software</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del artículo"
          className="mb-2"
          required
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido del artículo"
          className="mb-2"
          required
        />
        <Button type="submit">
          <PlusCircle className="mr-2 h-4 w-4" />
          {editingId !== null ? 'Actualizar Artículo' : 'Publicar Artículo'}
        </Button>
      </form>
      <div>
        {articles.map(article => (
          <Card key={article.id} className="mb-4">
            <CardHeader>
              <h2 className="text-xl font-semibold">{article.title}</h2>
            </CardHeader>
            <CardContent>
              <p>{article.content}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => handleEdit(article)} className="mr-2">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(article.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogApp;