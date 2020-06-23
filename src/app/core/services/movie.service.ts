import { Injectable } from "@angular/core";
import { Movie } from "src/app/shared/models/movie";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { movieDbConfig } from "src/app/moviedb-config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    const url = `${movieDbConfig.url}upcoming?api_key=${movieDbConfig.api_key}&language=pt-BR&page=1`;
    return this.httpClient.get(url).pipe(map(this.apiResponseToMovies));
  }

  private apiResponseToMovies(apiResponse: any): Movie[] {
    const results: any[] =
      apiResponse && apiResponse.results ? apiResponse.results : [];

    const movies = results.map<Movie>((result) => {
      return {
        id: result.id,
        poster_path: result.poster_path,
        title: result.title,
      };
    });
    return movies;
  }
}
