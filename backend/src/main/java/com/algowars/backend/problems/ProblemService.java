package com.algowars.backend.problems;

import com.algowars.backend.data.entities.Problem;
import com.algowars.backend.problems.dtos.ProblemPaginationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProblemService {
    private final ProblemRepository problemRepository;

    public Page<Problem> findAllPageable(ProblemPaginationDto paginationDto) {
        PageRequest pageRequest = PageRequest.of(paginationDto.getPage() -1, paginationDto.getSize());

        return problemRepository.findAllBeforeTimestamp(pageRequest, paginationDto.getTimestamp());
    }
}
