import type { ArtistAPIResponseModel, ArtistModel } from '#modules/artists/models'
import type { z } from 'zod'
import { createSongPayload } from '#modules/songs/helpers'
import { createAlbumPayload } from '#modules/albums/helpers'
import { createImageLinks } from '#common/helpers'

export const createArtistPayload = (artist: z.infer<typeof ArtistAPIResponseModel>): z.infer<typeof ArtistModel> => ({
  id: artist.artistId || artist.id,
  name: artist.name,
  url: artist.urls?.overview || artist.perma_url,
  type: artist.type,
  followerCount: artist.follower_count,
  fanCount: artist.fan_count,
  isVerified: artist.isVerified,
  dominantLanguage: artist.dominantLanguage,
  dominantType: artist.dominantType,
  bio: artist.bio && JSON.parse(artist.bio),
  dob: artist.dob,
  fb: artist.fb,
  twitter: artist.twitter,
  wiki: artist.wiki,
  availableLanguages: artist.availableLanguages,
  isRadioPresent: artist.isRadioPresent,
  image: createImageLinks(artist.image),
  topSongs: artist.topSongs?.map(createSongPayload) || [],
  topAlbums: artist.topAlbums?.map(createAlbumPayload) || [],
  singles: artist.singles?.map(createSongPayload) || [],
  similarArtists:
    artist.similar_artists?.map((similarArtist) => ({
      id: similarArtist.id,
      name: similarArtist.name,
      url: similarArtist.perma_url,
      image: createImageLinks(similarArtist.image_url),
      languages: similarArtist.languages && JSON.parse(similarArtist.languages),
      wiki: similarArtist.wiki,
      dob: similarArtist.dob,
      fb: similarArtist.fb,
      twitter: similarArtist.twitter,
      isRadioPresent: similarArtist.isRadioPresent,
      type: similarArtist.type,
      dominantType: similarArtist.dominantType,
      aka: similarArtist.aka,
      bio: similarArtist.bio,
      similarArtists: similarArtist.similar && JSON.parse(similarArtist.similar)
    })) || []
})
