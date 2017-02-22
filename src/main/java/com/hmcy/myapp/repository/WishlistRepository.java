package com.hmcy.myapp.repository;

import com.hmcy.myapp.domain.Wishlist;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Wishlist entity.
 */
@SuppressWarnings("unused")
public interface WishlistRepository extends JpaRepository<Wishlist,Long> {

}
