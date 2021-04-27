import React, { useEffect, useState } from 'react'
import { RepositoryItem } from './repositoryItem'
import '../styles/repositories.scss'

interface IRepositoryItem {
  name: string
  description: string
  html_url: string
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<IRepositoryItem[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/guiizis/repos', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
      .then((response) => response.json())
      .then((data) => setRepositories(data))
  }, [])

  console.log(repositories)

  return (
    <section className="repository-list">
      <h1>Lista de Repositório</h1>

      <ul>
        {repositories.map((repository) => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  )
}
