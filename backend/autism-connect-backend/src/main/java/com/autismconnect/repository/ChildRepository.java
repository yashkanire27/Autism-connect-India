package com.autismconnect.repository;

import com.autismconnect.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByParent_ParentId(Long parentId);
}
